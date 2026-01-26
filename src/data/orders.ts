export interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Maria Silva",
    email: "maria.silva@email.com",
    total: 189.90,
    status: 'delivered',
    date: '2024-01-20',
    items: [
      { productId: "1", name: "Terço de São Bento em Madeira", quantity: 1, price: 129.90 },
      { productId: "5", name: "Mini Terço de Nossa Senhora", quantity: 1, price: 60.00 }
    ]
  },
  {
    id: "ORD-002",
    customerName: "João Santos",
    email: "joao.santos@email.com",
    total: 129.90,
    status: 'shipped',
    date: '2024-01-22',
    items: [
      { productId: "1", name: "Terço de São Bento em Madeira", quantity: 1, price: 129.90 }
    ]
  },
  {
    id: "ORD-003",
    customerName: "Ana Paula",
    email: "ana.paula@email.com",
    total: 259.80,
    status: 'processing',
    date: '2024-01-24',
    items: [
      { productId: "2", name: "Terço de Cristal Nossa Senhora", quantity: 2, price: 129.90 }
    ]
  },
  {
    id: "ORD-004",
    customerName: "Pedro Oliveira",
    email: "pedro.o@email.com",
    total: 89.90,
    status: 'pending',
    date: '2024-01-25',
    items: [
      { productId: "4", name: "Terço Masculino em Onix", quantity: 1, price: 89.90 }
    ]
  },
  {
    id: "ORD-005",
    customerName: "Carla Souza",
    email: "carla.s@email.com",
    total: 129.90,
    status: 'delivered',
    date: '2024-01-15',
    items: [
      { productId: "2", name: "Terço de Cristal Nossa Senhora", quantity: 1, price: 129.90 }
    ]
  }
];
