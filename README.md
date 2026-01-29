# Product Listing Dashboard

A small product listing experience built as part of a frontend coding challenge.  
The application demonstrates product browsing, search, filtering, pagination, and full product CRUD interactions using a modern React stack.

🔗 **Live Demo:** https://products-db-khaki.vercel.app/  
📦 **API Used:** https://fakestoreapi.com

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Hook Form**
- **Zod**
- **Context API** (for global product state)
- **Fake Store API**

---

## Features

### Product Listing
- Fetches and displays products from Fake Store API
- Shows relevant product details (image, title, price, category)
- Responsive, dashboard-friendly layout

### Search & Filtering
- Search products by title
- Filter products by:
  - Category
  - Price range
- Search and filters work together seamlessly

### Pagination
- Products are paginated for improved usability
- Client-side pagination for simplicity and performance

### Empty States
- Graceful handling of:
  - No products available
  - No results after search or filtering

### Single Product View
- Dedicated view for individual products
- Displays complete product details
- Improves clarity and browsing experience

### Add Product
- Add new products using a modal dialog
- Form built with React Hook Form and Zod validation
- Newly added products appear instantly in the product list
- Persistence beyond the session is not required

### Edit Product
- Existing products can be edited via the same modal interface
- Form is prefilled with existing product data
- Changes are reflected immediately in the list and single view

### Delete Product
- Products can be removed from the list
- Updates are handled globally using Context API
- UI feedback ensures a clear delete action

---

## State Management

- Product data is managed globally using **React Context API**
- Enables consistent state across:
  - Product list
  - Search & filters
  - Pagination
  - Add / Edit / Delete
  - Single product view

This approach keeps the codebase simple, scalable, and easy to reason about.

---

## Assumptions & Tradeoffs

### Image Rendering
- The Fake Store API `/products` endpoint accepts image values as URLs only.
- Since image URLs can come from arbitrary external sources (user input),
  `next/image` was not used due to its requirement for preconfigured domains.
- A standard `<img>` tag avoids runtime errors and allows rendering
  images from any valid URL.
- Lazy loading and error fallbacks are applied to maintain usability.

This approach prioritizes robustness and simplicity for an admin-style interface.

### Pagination
- Pagination is implemented on the client side.
- Server-side pagination was considered out of scope for this challenge.

### Persistence
- Product additions, edits, and deletions are stored in memory.
- Backend persistence was intentionally omitted per the problem statement.

---

## Validation

- All forms use **Zod** for schema-based validation
- Inline error messages improve usability
- Invalid submissions are prevented before updating global state

---

## How to Run the Project Locally

```bash
# Clone the repository
git clone https://github.com/Jasil-kk/products-db.git

# Navigate to the project
cd products-db

# Install dependencies
npm install

# Run the development server
npm run dev
