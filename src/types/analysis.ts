export type Priority = 'essential' | 'recommended' | 'optional';

export interface IdentifiedElement {
  element: string;
  details: string;
}

export interface ProductRecommendation {
  id: string;
  reason: string;
  forElement: string;
  priority: Priority;
}

export interface StructureAnalysis {
  structureType: string;
  description: string;
  estimatedScale: string;
  siteConstraints: string;
}

export interface AnalysisResponse {
  analysis: StructureAnalysis;
  identifiedElements: IdentifiedElement[];
  recommendations: ProductRecommendation[];
  additionalNotes: string;
}

export interface AnalysisErrorResponse {
  error: string;
  reason?: string;
}
