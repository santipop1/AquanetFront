export interface SaleByMonth {
  month: number;
  totalLiters: number;
}

export interface SalesYear {
  year: number;
  salesByMonth: SaleByMonth[];
}
