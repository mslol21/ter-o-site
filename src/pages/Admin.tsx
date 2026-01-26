import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  CheckCircle,
  Clock,
  Package,
  XCircle,
  Eye,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
} from "recharts";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { blogPosts as initialPosts, BlogPost } from "@/data/posts";
import { products as initialProducts, Product } from "@/data/products";
import { orders as initialOrders, Order } from "@/data/orders";

const salesData = [
  { name: "Seg", sales: 400 },
  { name: "Ter", sales: 300 },
  { name: "Qua", sales: 600 },
  { name: "Qui", sales: 800 },
  { name: "Sex", sales: 500 },
  { name: "Sab", sales: 900 },
  { name: "Dom", sales: 700 },
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useAuth();
  
  // Data State
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [storeProducts, setStoreProducts] = useState<Product[]>(initialProducts);
  const [storeOrders, setStoreOrders] = useState<Order[]>(initialOrders);

  // Edit State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const totalSales = storeOrders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = storeOrders.filter(o => o.status === 'pending').length;

  // Handlers - Articles
  const handleSavePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      excerpt: formData.get("excerpt") as string,
    };

    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
      toast.success("Artigo atualizado com sucesso!");
    } else {
      const newPost: BlogPost = {
        id: Math.random().toString(36).substr(2, 9),
        ...postData,
        slug: postData.title.toLowerCase().replace(/ /g, '-'),
        content: "Conteúdo do novo artigo...",
        image: "/placeholder.svg",
        author: "Admin",
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: 5,
        featured: false,
      };
      setPosts([newPost, ...posts]);
      toast.success("Novo artigo publicado!");
    }
    setIsPostDialogOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast.error("Artigo removido.");
  };

  // Handlers - Products
  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name") as string,
      devotion: formData.get("devotion") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
    };

    if (editingProduct) {
      setStoreProducts(storeProducts.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
      toast.success("Produto atualizado!");
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        ...productData,
        slug: productData.name.toLowerCase().replace(/ /g, '-'),
        description: "Descrição do novo produto...",
        spiritualDescription: "Significado do novo produto...",
        images: ["/placeholder.svg"],
        featured: false,
        bestseller: false,
        materials: ["Material"],
        size: "Padrão",
      };
      setStoreProducts([newProduct, ...storeProducts]);
      toast.success("Novo produto adicionado à loja!");
    }
    setIsProductDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setStoreProducts(storeProducts.filter(p => p.id !== id));
    toast.error("Produto removido do catálogo.");
  };

  // Handlers - Orders
  const handleUpdateOrderStatus = (id: string, newStatus: Order['status']) => {
    setStoreOrders(storeOrders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Status do pedido ${id} alterado.`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Entregue</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Package className="w-3 h-3 mr-1" /> Enviado</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="w-3 h-3 mr-1" /> Processando</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500 hover:bg-orange-600"><Clock className="w-3 h-3 mr-1" /> Pendente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600"><XCircle className="w-3 h-3 mr-1" /> Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
              <img src="/logo.png" alt="Admin Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">Faith Beads <span className="text-primary font-serif italic">Admin</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Ver Site</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="bg-white border p-1 h-12 inline-flex gap-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" /> Artigos
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <ShoppingBag className="w-4 h-4 mr-2" /> Produtos
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" /> Vendas
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Total de Vendas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    +12% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Pedidos Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingOrders}</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Aguardando processamento
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Total de Artigos</CardTitle>
                  <FileText className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Conteúdos publicados
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Total de Produtos</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{storeProducts.length}</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Ativos na loja
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Desempenho de Vendas Semanais
                  </CardTitle>
                  <CardDescription>Visualização das vendas nos últimos 7 dias</CardDescription>
                </CardHeader>
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `R$${value}`} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        formatter={(value) => [`R$ ${value}`, 'Vendas']}
                      />
                      <Line type="monotone" dataKey="sales" stroke="#bf924a" strokeWidth={3} dot={{ r: 4, fill: '#bf924a' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Últimos Pedidos</CardTitle>
                  <CardDescription>Visualize e gerencie os pedidos mais recentes</CardDescription>
                </CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeOrders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.customerName}</TableCell>
                        <TableCell>R$ {order.total.toFixed(2).replace('.', ',')}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setViewingOrder(order);
                              setIsOrderDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          {/* ARTICLES TAB */}
          <TabsContent value="articles" className="animate-in fade-in duration-300">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Artigos</CardTitle>
                  <CardDescription>Crie, edite e remova os conteúdos do blog</CardDescription>
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90 transition-all shadow-md active:scale-95 group"
                  onClick={() => {
                    setEditingPost(null);
                    setIsPostDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Novo Artigo
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="Pesquisar artigos..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="w-[400px]">Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts
                        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((post) => (
                        <TableRow key={post.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell><Badge variant="outline">{post.category}</Badge></TableCell>
                          <TableCell>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 py-0">Publicado</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="hover:text-blue-600 transition-colors"
                                onClick={() => {
                                  setEditingPost(post);
                                  setIsPostDialogOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="hover:text-red-600 transition-colors"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRODUCTS TAB */}
          <TabsContent value="products" className="animate-in fade-in duration-300">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Produtos</CardTitle>
                  <CardDescription>Controle o catálogo de terços e sacramentais</CardDescription>
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90 transition-all shadow-md active:scale-95 group"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Novo Produto
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Pesquisar produtos..." className="pl-10" />
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="w-[300px]">Produto</TableHead>
                        <TableHead>Devoção</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storeProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-slate-400" />
                              </div>
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="secondary" className="capitalize">{product.devotion.replace('-', ' ')}</Badge></TableCell>
                          <TableCell>R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell>
                            <span className={product.stock < 15 ? "text-orange-500 font-medium" : ""}>
                              {product.stock} un
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="hover:text-blue-600 transition-colors"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsProductDialogOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="hover:text-red-600 transition-colors"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SALES TAB */}
          <TabsContent value="sales" className="animate-in fade-in duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Vendas</CardTitle>
                <CardDescription>Acompanhe todos os pedidos realizados no site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Pesquisar por ID ou Cliente..." className="pl-10" />
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead>ID Pedido</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storeOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                          <TableCell className="font-mono text-xs text-slate-500">{order.id}</TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-700">{order.customerName}</span>
                              <span className="text-xs text-slate-400">{order.email}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-800">
                            R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="group-hover:bg-white border-transparent hover:border-slate-200 border"
                              onClick={() => {
                                setViewingOrder(order);
                                setIsOrderDialogOpen(true);
                              }}
                            >
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* --- DIALOGS --- */}

        {/* Post Dialog */}
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSavePost}>
              <DialogHeader>
                <DialogTitle>{editingPost ? "Editar Artigo" : "Novo Artigo"}</DialogTitle>
                <DialogDescription>
                  Preencha as informações para publicar no blog.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título do Artigo</Label>
                  <Input id="title" name="title" defaultValue={editingPost?.title} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input id="category" name="category" defaultValue={editingPost?.category} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Resumo (SEO)</Label>
                  <Textarea id="excerpt" name="excerpt" defaultValue={editingPost?.excerpt} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPostDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" className="btn-gold">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Product Dialog */}
        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSaveProduct}>
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                <DialogDescription>
                  Gerencie as informações do terço no estoque.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="devotion">Devoção</Label>
                  <Input id="devotion" name="devotion" defaultValue={editingProduct?.devotion} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input id="price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Estoque</Label>
                    <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} required />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" className="btn-gold">Salvar Produto</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Order Details Dialog */}
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido {viewingOrder?.id}</DialogTitle>
              <DialogDescription>
                Informações completas da compra realizada.
              </DialogDescription>
            </DialogHeader>
            {viewingOrder && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Cliente</p>
                    <p className="font-bold">{viewingOrder.customerName}</p>
                    <p className="text-xs text-slate-400">{viewingOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Data do Pedido</p>
                    <p className="font-bold">{new Date(viewingOrder.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="h-9">Item</TableHead>
                        <TableHead className="h-9">Qtd</TableHead>
                        <TableHead className="h-9 text-right">Preço</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewingOrder.items.map((item, idx) => (
                        <TableRow key={idx} className="text-xs">
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-slate-50/50">
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right text-primary uppercase">R$ {viewingOrder.total.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-3">
                  <Label>Alterar Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                      <Button
                        key={status}
                        variant={viewingOrder.status === status ? "default" : "outline"}
                        size="sm"
                        className="text-[10px] h-7 px-2"
                        onClick={() => handleUpdateOrderStatus(viewingOrder.id, status)}
                      >
                        {status.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsOrderDialogOpen(false)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="py-6 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
          <p>© 2024 Faith Beads Admin - Sistema de Gestão Interna</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
