import CatalogClient from "./CatalogClient";

export const metadata = {
  title: 'Full Figure Catalog - Figure.in',
  description: 'Browse our entire collection of premium figures with sorting and filtering capabilities.',
};

export default function ProductsPage() {
  return <CatalogClient />;
}
