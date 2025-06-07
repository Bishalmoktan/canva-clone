export interface IDesign {
  userId?: string;
  name?: string;
  canvasData?: string;
  width?: number;
  height?: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
