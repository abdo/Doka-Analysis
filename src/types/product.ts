export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  system: string;
  category: string;
  handling: string;
  bestFor: string[];
}

export interface ProductForAnalysis {
  id: string;
  name: string;
  description: string;
  category: string;
  handling: string;
  bestFor: string[];
}

export function toAnalysisProduct(product: Product): ProductForAnalysis {
  const { imageUrl, system, ...rest } = product;
  return rest;
}
