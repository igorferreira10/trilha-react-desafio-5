import { getGlobalData } from '../../utils/global-data';
import {
  getPostBySlug,
} from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';


const components = {
  a: CustomLink,
  Head,
};

export default function PostPage({
  posts,
  globalData,
}) {
  return (
    <Layout>
      <SEO
        title={`${posts.title} - ${globalData.name}`}
        description={posts.description}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {posts?.title}
          </h1>
          {posts?.description && (
            <p className="text-xl mb-4">{posts?.description}</p>
          )}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400">Por: {posts?.author}</p>
            <p className="text-gray-500 dark:text-gray-300">Publicado em: {new Date(posts?.date).toLocaleDateString()}</p>
            {posts?.tags && (
              <div className="mt-4">
                <p className="font-semibold">Tags:</p>
                <ul className="flex justify-center space-x-2">
                  {posts.tags.map((tag) => (
                    <li key={tag} className="bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-1 text-sm">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}       
          </div>
        </header>
        <main>
          <article className="prose dark:prose-dark">
           <MDXRemote{...posts.body}components={components} />
          </article>
        </main>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const globalData = getGlobalData();
  const posts = await getPostBySlug(params.id);
 

  return {
    props: {
      globalData,
      posts,
    },
  };
};

