export interface Member {
  id?: number;
  fullName: string;
  nationalId: string;
  phone: string;
  joinDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}