// ============================================================================
// talk-bun.ts - Self-Contained Bun WebSocket Server for Deepgram Voice Agent
// ============================================================================
// TypeScript version for Railway deployment using Bun's native WebSocket support

// Bun type declarations (for TypeScript editing - Bun runtime provides these globally)
declare const Bun: any;


const PORT = process.env.PORT || 3001;
const DEEPGRAM_KEY = process.env.DEEPGRAM_KEY;

// ============================================================================
// DEEPGRAM CONFIGURATION
// ============================================================================

// Doka Products Catalog (without imageUrl and link for AI processing)
const DOKA_PRODUCTS = [
  { "id": "framax-xlife", "name": "Framax Xlife", "description": "Heavy-duty steel-framed wall formwork for large areas. Requires crane for handling. Best for high-rise buildings, commercial structures, and projects with repetitive wall pours where speed and durability matter.", "category": "wall", "handling": "crane", "bestFor": ["large walls", "high-rise", "commercial buildings", "repetitive pours"] },
  { "id": "framax-xlife-plus", "name": "Framax Xlife plus", "description": "Advanced version of Framax Xlife with improved form tie system operable from one side only. Reduces labor time and improves safety. Ideal for projects requiring faster cycle times.", "category": "wall", "handling": "crane", "bestFor": ["large walls", "fast cycling", "labor efficiency"] },
  { "id": "frami-xlife", "name": "Frami Xlife", "description": "Lightweight steel-framed formwork designed for manual handling without crane. Versatile system for foundations, walls, and columns in residential and small commercial projects.", "category": "wall", "handling": "manual", "bestFor": ["foundations", "residential walls", "small columns", "sites without crane"] },
  { "id": "alu-framax-xlife", "name": "Alu-Framax Xlife", "description": "Aluminum-framed large-area formwork combining the panel sizes of Framax with reduced weight. Can be used with or without crane. Good for projects needing flexibility between manual and crane handling.", "category": "wall", "handling": "both", "bestFor": ["medium to large walls", "mixed handling requirements"] },
  { "id": "dokaxlight", "name": "DokaXlight", "description": "Ultra-lightweight aluminum handset formwork (under 25kg per panel). No crane needed. Ideal for residential construction, renovation projects, and sites with limited access.", "category": "wall", "handling": "manual", "bestFor": ["residential", "renovation", "limited site access", "small crews"] },
  { "id": "large-area-formwork-top-50", "name": "Large-area formwork Top 50", "description": "Timber-beam based large-area formwork system adaptable to any shape and load requirement. Used for walls, slabs, and custom applications where standard panel sizes don't fit.", "category": "wall", "handling": "crane", "bestFor": ["custom shapes", "non-standard dimensions", "architectural concrete"] },
  { "id": "wall-formwork-ff20", "name": "Wall formwork FF20", "description": "Timber-beam wall formwork with systematic grid pattern. Produces smooth concrete surfaces without frame imprints. Good for exposed concrete where finish quality matters.", "category": "wall", "handling": "crane", "bestFor": ["architectural concrete", "smooth finishes", "exposed walls"] },
  { "id": "wall-formwork-ff100-tec", "name": "Wall formwork FF100 tec", "description": "High-load capacity timber-beam formwork for walls requiring extra concrete pressure resistance. Used for thick walls, high pours, and infrastructure projects.", "category": "wall", "handling": "crane", "bestFor": ["thick walls", "high concrete pressure", "infrastructure"] },
  { "id": "circular-formwork-h20", "name": "Circular formwork H20", "description": "Adjustable formwork for creating curved and circular concrete walls. Radius can be configured on-site. Essential for tanks, silos, curved architectural walls, and round structures.", "category": "wall", "handling": "crane", "bestFor": ["curved walls", "circular structures", "tanks", "silos"] },
  { "id": "supercurve", "name": "SuperCurve", "description": "Flexible formwork system for creating complex curved and free-form concrete surfaces. Offers superior flexibility for organic architectural designs and non-standard geometries.", "category": "wall", "handling": "crane", "bestFor": ["free-form shapes", "complex curves", "architectural landmarks"] },
  { "id": "column-formwork-top-50", "name": "Column formwork Top 50", "description": "Versatile column formwork system for rectangular and square columns of any size. Timber-beam construction allows custom dimensions. Used for structural columns in all building types.", "category": "column", "handling": "crane", "bestFor": ["large columns", "custom column sizes", "commercial buildings"] },
  { "id": "column-formwork-rs", "name": "Column formwork RS", "description": "Steel formwork specifically designed for round/circular column cross-sections. Multiple diameter options available. Used for architectural round columns and structural circular supports.", "category": "column", "handling": "crane", "bestFor": ["round columns", "circular cross-sections"] },
  { "id": "column-formwork-ks-xlife", "name": "Column formwork KS Xlife", "description": "Quick-release column formwork with folding mechanism for fast stripping. Hinged design allows rapid setup and removal. Ideal for projects with many identical columns.", "category": "column", "handling": "crane", "bestFor": ["repetitive columns", "fast cycling", "parking structures"] },
  { "id": "column-formwork-frami-xlife", "name": "Column formwork Frami Xlife", "description": "Lightweight column formwork for rectangular and square columns, handleable without crane. Uses Frami panels configured for column pours. Good for residential and small commercial projects.", "category": "column", "handling": "manual", "bestFor": ["small columns", "residential", "manual handling"] },
  { "id": "dokaxdek", "name": "DokaXdek", "description": "Modern slab formwork system family designed for efficiency. Combines multiple slab formwork approaches in one compatible system. Represents Doka's latest floor formwork technology.", "category": "slab", "handling": "both", "bestFor": ["modern buildings", "efficient slab construction", "flexible applications"] },
  { "id": "dokaflex", "name": "Dokaflex", "description": "Versatile beam-and-plywood slab formwork system for manual setup. Highly adaptable to different slab shapes and sizes. The standard choice for most floor slab applications.", "category": "slab", "handling": "manual", "bestFor": ["standard floor slabs", "variable layouts", "residential", "commercial"] },
  { "id": "dokaflex-30-tec", "name": "Dokaflex 30 tec", "description": "Enhanced timber-beam slab formwork optimized for cost-efficiency and longer service life. Engineered for reduced material usage while maintaining load capacity.", "category": "slab", "handling": "manual", "bestFor": ["cost-sensitive projects", "high reuse requirements"] },
  { "id": "dokadek-30", "name": "Dokadek 30", "description": "Panel-based slab formwork without exposed beams. Faster to install than beam systems. Each panel covers a defined area, reducing setup complexity on site.", "category": "slab", "handling": "manual", "bestFor": ["fast slab forming", "reduced labor", "commercial buildings"] },
  { "id": "dokadek-20", "name": "Dokadek 20", "description": "Ergonomic panel floor formwork designed specifically for residential construction. Lightweight panels optimized for smaller floor areas and typical residential ceiling heights.", "category": "slab", "handling": "manual", "bestFor": ["residential buildings", "apartments", "smaller floor areas"] },
  { "id": "dokamatic-table", "name": "Dokamatic table", "description": "Pre-assembled table formwork units for rapid slab forming. Tables are crane-lifted as complete units, minimizing on-site assembly. Best for repetitive floor plates in multi-story buildings.", "category": "slab", "handling": "crane", "bestFor": ["high-rise buildings", "repetitive floors", "fast cycling"] },
  { "id": "dokaflex-table", "name": "Dokaflex table", "description": "Table formwork built from Dokaflex components. Combines the flexibility of beam formwork with the speed of table systems. Tables can be reconfigured for different floor layouts.", "category": "slab", "handling": "crane", "bestFor": ["multi-story buildings", "variable floor layouts"] },
  { "id": "safeflex", "name": "Safeflex", "description": "Beam formwork for casting concrete beams between precast or in-situ slabs. Provides safe working platform during beam construction. Used where floor structure includes drop beams.", "category": "slab", "handling": "manual", "bestFor": ["drop beams", "beam-and-slab structures", "precast combinations"] },
  { "id": "xclimb-60-automatic", "name": "Automatic climbing formwork Xclimb 60", "description": "Self-climbing formwork system that advances vertically without crane assistance. Hydraulic climbing mechanism. Essential for tall structures like high-rise cores, towers, and bridge piers.", "category": "climbing", "handling": "self-climbing", "bestFor": ["high-rise cores", "tall structures", "crane-independent climbing"] },
  { "id": "xclimb-60-guided", "name": "Guided climbing formwork Xclimb 60", "description": "Climbing formwork guided on vertical rails fixed to the structure. Provides precise vertical alignment pour after pour. Used for straight vertical walls requiring exact positioning.", "category": "climbing", "handling": "crane", "bestFor": ["vertical walls", "precise alignment", "tall straight structures"] },
  { "id": "ske-plus", "name": "Automatic climbing formwork SKE plus", "description": "Heavy-duty self-climbing formwork for structures of any shape and height. More robust than Xclimb 60, handles complex geometries. Used for iconic high-rise buildings and complex cores.", "category": "climbing", "handling": "self-climbing", "bestFor": ["complex high-rises", "varying core shapes", "landmark buildings"] },
  { "id": "climbing-formwork-mf240", "name": "Climbing formwork MF240", "description": "Crane-lifted climbing formwork adaptable to any wall shape and height. Formwork and platform climb together as one unit. Versatile solution for varying project requirements.", "category": "climbing", "handling": "crane", "bestFor": ["varied wall shapes", "medium-height structures", "flexibility"] },
  { "id": "platform-scp", "name": "Platform SCP", "description": "Self-climbing platform specifically designed for high-rise building cores. Provides protected work environment at height. Combines forming capability with comprehensive work platforms.", "category": "climbing", "handling": "self-climbing", "bestFor": ["high-rise cores", "elevator shafts", "stair cores"] },
  { "id": "climbing-formwork-k", "name": "Climbing formwork K", "description": "Crane-jumped climbing formwork combining folding platform with formwork element. Cost-effective climbing solution for medium-height structures. Platform folds for transport.", "category": "climbing", "handling": "crane", "bestFor": ["medium-height walls", "cost-effective climbing"] },
  { "id": "shaft-platform", "name": "Shaft platform", "description": "Climbing formwork designed for interior shaft construction (elevator shafts, stairwells). Works from inside the shaft. Essential for core construction in multi-story buildings.", "category": "climbing", "handling": "crane", "bestFor": ["elevator shafts", "stairwell cores", "interior shafts"] },
  { "id": "staxo-100", "name": "Load-bearing tower Staxo 100", "description": "Heavy-duty steel-frame shoring tower for large heights and high loads. 100kN leg load capacity. Used for bridge construction, industrial structures, and heavy slab support.", "category": "shoring", "handling": "crane", "bestFor": ["bridges", "heavy loads", "large shoring heights", "industrial"] },
  { "id": "staxo-40", "name": "Load-bearing tower Staxo 40", "description": "Lightweight shoring tower for building construction. 40kN leg load capacity. Manageable without crane for standard applications. Common choice for commercial and residential slab shoring.", "category": "shoring", "handling": "manual", "bestFor": ["building construction", "standard loads", "commercial slabs"] },
  { "id": "dokaxshore", "name": "DokaXshore", "description": "Modern shoring system combining frame stability with flexible geometry. Only 4 parts per level, tool-free assembly, 100kN load capacity. Represents latest Doka shoring technology.", "category": "shoring", "handling": "manual", "bestFor": ["efficient assembly", "flexible geometry", "modern projects"] },
  { "id": "load-bearing-tower-d3", "name": "Load-bearing tower d3", "description": "Cost-effective modular shoring system for wide range of applications. Good balance of load capacity and economy. Suitable for most standard building construction shoring needs.", "category": "shoring", "handling": "manual", "bestFor": ["cost-effective shoring", "standard applications", "versatile use"] },
  { "id": "dokashore", "name": "Heavy-duty supporting system DokaShore", "description": "Extra-high-capacity shoring system for very heavy loads. Used for bridge falsework, transfer structures, and industrial applications where standard shoring is insufficient.", "category": "shoring", "handling": "crane", "bestFor": ["very heavy loads", "bridge falsework", "transfer structures"] },
  { "id": "doka-unikit", "name": "Doka UniKit", "description": "Universal heavy-duty engineering kit for infrastructure projects. Modular components combine to create custom shoring and formwork solutions for bridges, tunnels, and special structures.", "category": "shoring", "handling": "crane", "bestFor": ["bridges", "tunnels", "infrastructure", "custom engineering"] },
  { "id": "sl-1", "name": "Heavy-duty supporting system SL-1", "description": "Modular heavy-duty system for tunnel construction and major infrastructure. Can be configured for various tunnel methods. High load capacity for demanding civil engineering projects.", "category": "shoring", "handling": "crane", "bestFor": ["tunnels", "major infrastructure", "civil engineering"] },
  { "id": "floor-props", "name": "Floor props", "description": "Adjustable steel props for supporting freshly poured slabs and beams. Height-adjustable to suit different floor-to-ceiling heights. Basic component used with all slab formwork systems.", "category": "components", "handling": "manual", "bestFor": ["slab support", "reshoring", "all floor formwork"] },
  { "id": "formwork-beams", "name": "Formwork beams", "description": "Engineered timber I-beams (H20) used as primary components in many Doka formwork systems. Provide spanning capability for slabs and custom formwork configurations.", "category": "components", "handling": "manual", "bestFor": ["slab formwork", "custom configurations", "all beam-based systems"] },
  { "id": "edge-protection-xp", "name": "Edge protection system XP", "description": "Fall protection guardrail system for slab edges and openings. Attaches to formwork or structure. Required safety equipment for all elevated concrete work.", "category": "safety", "handling": "manual", "bestFor": ["slab edges", "fall protection", "all elevated work"] },
  { "id": "xsafe-edge-protection-z", "name": "Xsafe Edge protection Z", "description": "Engineered edge protection for perimeter edges, internal openings, and floor edges. Pre-assembled posts reduce installation labor. Modern safety system for efficient site protection.", "category": "safety", "handling": "manual", "bestFor": ["perimeter protection", "floor openings", "efficient installation"] },
  { "id": "xsafe-plus", "name": "Platform system Xsafe plus", "description": "Integrated safety platform system for wall and column formwork. Provides working platforms at height during wall forming. Attaches directly to formwork panels.", "category": "safety", "handling": "crane", "bestFor": ["wall formwork access", "working at height", "integrated safety"] },
  { "id": "stair-tower-250", "name": "Stair tower 250", "description": "Modular stair access tower for construction sites. Provides safe vertical access to different floor levels during construction. Required for multi-story site access.", "category": "safety", "handling": "manual", "bestFor": ["site access", "multi-story buildings", "vertical circulation"] },
  { "id": "folding-platform-k", "name": "Folding platform K", "description": "Pre-assembled folding scaffold platform for concrete construction. Folds flat for transport, opens quickly on site. Used as working platform for wall forming operations.", "category": "safety", "handling": "crane", "bestFor": ["wall forming access", "quick setup", "reusable platforms"] },
  { "id": "protection-screen-xclimb-60", "name": "Protection screen Xclimb 60", "description": "Climbing enclosure/screen system for high-rise projects. Provides weather protection and falling object containment around the working level. Essential for urban high-rise construction.", "category": "safety", "handling": "self-climbing", "bestFor": ["high-rise buildings", "weather protection", "urban sites"] },
  { "id": "concremote", "name": "Concremote", "description": "IoT sensor system that monitors concrete temperature and calculates real-time strength development. Enables optimized stripping times and quality documentation. Digital service for concrete monitoring.", "category": "digital", "handling": "n/a", "bestFor": ["concrete monitoring", "optimized stripping", "quality control"] },
  { "id": "mydoka", "name": "myDoka customer portal", "description": "Digital customer portal providing real-time project data, material tracking, delivery status, and documentation access. Central platform for managing Doka rentals and projects.", "category": "digital", "handling": "n/a", "bestFor": ["project management", "material tracking", "documentation"] }
];

const CATEGORIES = {
  "wall": "Wall Formwork - For vertical concrete walls of all sizes",
  "column": "Column Formwork - For structural concrete columns",
  "slab": "Floor/Slab Formwork - For horizontal concrete floors and ceilings",
  "climbing": "Climbing Formwork - For tall structures built in vertical stages",
  "shoring": "Shoring Systems - Temporary support structures during construction",
  "safety": "Safety Systems - Fall protection and site access equipment",
  "components": "System Components - Basic elements used across multiple systems",
  "digital": "Digital Services - Software and IoT solutions"
};

const DOKA_VOICE_PROMPT = `You are a construction formwork expert assistant for Doka, one of the world's leading formwork and scaffolding companies. You help construction professionals find the right formwork solutions for their projects through voice conversation.

IMPORTANT CONTEXT:
- Formwork is temporary - it holds poured concrete in place until it cures and hardens, then is removed
- Different concrete elements need different formwork types:
  • Vertical walls → Wall Formwork
  • Horizontal floors/ceilings → Slab/Floor Formwork
  • Columns → Column Formwork
  • Tall structures built in stages → Climbing Formwork
  • Temporary support during construction → Shoring Systems
  • Worker safety at height → Safety Systems

YOUR ROLE IN CONVERSATION:
1. Listen carefully as the user describes their construction project
2. Ask clarifying questions to understand:
   - Type of structure (residential, commercial, high-rise, bridge, industrial, etc.)
   - Concrete elements needed (walls, slabs, columns, foundations, cores, etc.)
   - Project scale (small residential vs. large commercial)
   - Site constraints (crane availability, access limitations, etc.)
   - Number of floors, repeating elements, special requirements
3. Recommend appropriate products from the catalog below
4. Explain WHY each product suits their specific needs
5. Always mention safety systems as essential

AVAILABLE DOKA PRODUCTS:
${JSON.stringify(DOKA_PRODUCTS, null, 2)}

PRODUCT CATEGORIES:
${JSON.stringify(CATEGORIES, null, 2)}

CONVERSATION GUIDELINES:
- Be conversational and helpful, not robotic
- Ask one question at a time to gather information naturally
- Listen for keywords like "walls", "floors", "columns", "high-rise", "residential", etc.
- Match products to what the user describes
- Explain recommendations in simple terms
- For small projects (1-2 floors) without cranes, suggest manual-handling products
- For large projects with cranes, suggest crane-handled products
- For tall buildings (5+ stories), always mention climbing formwork for cores
- Always recommend appropriate safety systems
- Keep responses concise but informative
- If uncertain, ask for clarification rather than guessing

IMPORTANT RULES:
- Only recommend products from the provided catalog
- Match handling type to project constraints (manual vs crane)
- Be specific about why a product fits their needs
- Prioritize safety - always mention safety systems
- For multi-story buildings, consider both slab and wall formwork
- Be helpful and educational, explaining formwork concepts when needed

Remember: You're having a natural voice conversation. Be friendly, clear, and helpful!`;

const DEEPGRAM_CONFIG = {
  type: "Settings",
  audio: {
    input: {
      encoding: "linear16",
      sample_rate: 48000
    },
    output: {
      encoding: "linear16",
      sample_rate: 24000,
      container: "none"
    }
  },
  agent: {
    language: "en",
    speak: {
      provider: {
        type: "eleven_labs",
        model_id: "eleven_multilingual_v2",
        voice_id: "cgSgspJ2msm6clMCkdW9"
      }
    },
    listen: {
      provider: {
        type: "deepgram",
        version: "v1",
        model: "nova-3"
      }
    },
    think: {
      provider: {
        type: "groq",
        model: "openai/gpt-oss-20b"
      },
      prompt: DOKA_VOICE_PROMPT
    },
    greeting: "Hello! I'm your Doka formwork expert assistant. Tell me about your construction project, and I'll help you find the perfect formwork solutions. What are you building?"
  }
};

// ============================================================================
// BUN WEBSOCKET SERVER
// ============================================================================

Bun.serve({
  port: PORT as number,

  fetch(req: Request, server: any): Response | undefined {
    const url = new URL(req.url);

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'deepgram-voice-server-bun' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // WebSocket upgrade for /talk endpoint
    if (url.pathname === '/talk') {
      const success = server.upgrade(req);
      if (success) {
        return undefined; // Return undefined when upgrade succeeds
      }
      return new Response('WebSocket upgrade failed', { status: 400 });
    }

    return new Response('Not found', { status: 404 });
  },

  websocket: {
    open(ws: any) {
      console.log('[Client] Connected');

      if (!DEEPGRAM_KEY) {
        console.error('[Error] DEEPGRAM_KEY not found in environment');
        ws.send(JSON.stringify({ type: 'Error', error: 'Server configuration error' }));
        ws.close();
        return;
      }

      // Connect to Deepgram
      const deepgramWs = new WebSocket('wss://agent.deepgram.com/v1/agent/converse', {
        headers: {
          'Authorization': `Token ${DEEPGRAM_KEY}`
        }
      });

      // Store Deepgram WebSocket reference on client WebSocket
      (ws as any).deepgramWs = deepgramWs;

      deepgramWs.onopen = () => {
        console.log('[Deepgram] Connected');
        deepgramWs.send(JSON.stringify(DEEPGRAM_CONFIG));
        console.log('[Deepgram] Configuration sent');
      };

      deepgramWs.onmessage = (event: MessageEvent) => {
        const data = event.data;

        // Handle different data types from Deepgram
        if (typeof data === 'string') {
          // Text message - parse and log type
          try {
            const parsed = JSON.parse(data);
            console.log('[Deepgram →] Message type:', parsed.type);
          } catch (e) {
            // Not JSON, just pass through
          }
          ws.send(data);
        } else if (data instanceof ArrayBuffer || data instanceof Blob) {
          // Binary audio data - pass through
          ws.send(data);
        } else {
          // Unknown type - try to send as-is
          ws.send(data);
        }
      };

      deepgramWs.onclose = () => {
        console.log('[Deepgram] Disconnected');
      };

      deepgramWs.onerror = (error: any) => {
        console.error('[Deepgram] Error:', error);
        ws.send(JSON.stringify({ type: 'Error', error: 'Deepgram connection failed' }));
      };
    },

    message(ws: any, message: string | Buffer) {
      // Forward client messages to Deepgram
      const deepgramWs = (ws as any).deepgramWs;
      if (deepgramWs && deepgramWs.readyState === WebSocket.OPEN) {
        deepgramWs.send(message);
      }
    },

    close(ws: any) {
      console.log('[Client] Disconnected');
      const deepgramWs = (ws as any).deepgramWs;
      if (deepgramWs && deepgramWs.readyState === WebSocket.OPEN) {
        deepgramWs.close();
      }
    },

    error(ws: any, error: Error) {
      console.error('[Client] Error:', error.message);
    }
  }
});

console.log(`🚀 Bun WebSocket server running on http://localhost:${PORT}`);
console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}/talk`);

// Make this file a proper ES module to avoid global scope conflicts
export { };
