import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyPray } from "@/components/home/WhyPray";
import { Benefits } from "@/components/home/Benefits";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Benefits />
      <FeaturedProducts />
      <WhyPray />
      <BlogPreview />
      <Newsletter />
    </Layout>
  );
};

export default Index;
