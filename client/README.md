# ResearchForge - AI-Powered Research Platform

ResearchForge is an advanced AI-powered research platform that transforms how you explore and analyze information. Built on top of the open-source DecipherIt project, ResearchForge enhances the experience with additional features and improvements while maintaining the core functionality that makes it a powerful research assistant.

## Features

- **Multi-Source Research** - Input any combination of documents, links, or topics. Our AI seamlessly integrates information from all your sources into a unified research space.
- **AI-Powered Summaries** - Get instant, comprehensive summaries of your research materials. Our AI extracts key insights and presents them in clear, digestible formats.
- **Interactive Q&A** - Chat with your research materials in natural language. Ask questions and get instant answers based on all your input sources.
- **Smart FAQ Generation** - Automatically generate relevant FAQs from your research. Perfect for creating documentation, study guides, or knowledge bases.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Better Auth with Prisma
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/researchforge.git
cd researchforge/client
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Configure environment variables:
   Create a `.env` file with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/researchforge"
```

4. Set up the database:

```bash
npm run prisma:generate
npm run prisma:migrate:dev
```

5. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app directory with page components and API routes
- `components/` - Reusable UI components
- `lib/` - Utility functions and shared code
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## Contributing

This is an open-source project. Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT license.

## Created By

Made with ❤️ by Amit Wani

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
