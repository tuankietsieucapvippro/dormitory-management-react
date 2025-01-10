export class CreateAuditlogDto {
  actionname: string;
  tablename: string;
  recordid: number;
  description?: string;
  userid?: number;
} 