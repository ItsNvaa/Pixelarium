import renderMDX, { type RenderMDXReturnType } from "@/services/renderMDX";
import MDX from "@/components/modules/MDX";
import DevelopersDocsLayout from "@/layouts/DevelopersDocsLayout";
import React from "react";
import { Metadata } from "next";

const { loadMDXContent, frontMatter, toc }: Awaited<RenderMDXReturnType> =
  await renderMDX("./src/app/developers/apis/index.mdx");

export const metadata: Metadata = {
  title: `Developers API: ${frontMatter.title}`,
  description: `Pixelarium Developers API Documentation - ${frontMatter.description}`,
};

export default async function DevelopersAPISDocs(): Promise<React.ReactElement> {
  return (
    <>
      <DevelopersDocsLayout frontMatter={frontMatter} toc={toc}>
        <MDX mdxContent={loadMDXContent} />
      </DevelopersDocsLayout>
    </>
  );
}
