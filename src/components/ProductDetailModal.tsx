import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  quote: string;
  verse: string;
  price: number;
  edition: string;
  image: string;
  impact: string;
  story: string;
  rating: number;
  reviewCount: number;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && product) {
      // Navigate to the product detail page instead of showing modal
      navigate(`/product/${product.id}`);
      onClose();
    }
  }, [isOpen, product, navigate, onClose]);

  return null;
};

export default ProductDetailModal;