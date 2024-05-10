import Image from "next/image";
import Translation from "utils/translation";
import ComponentContainer from "../../shared/container/ComponentContainer";
import Newsletter from "../Newsletter";
import HomeSubTitle from "../SubTitle";
import HomeTitle from "../Title";

const BlogItem = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="col-span-12 flex h-full flex-col overflow-hidden rounded-[6px] md:col-span-6 lg:col-span-4">
      <div className="relative h-[320px] md:h-[320px] lg:h-[219px]">
        <Image
          src={image}
          fill
          alt=""
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <div className="flex-1 bg-white px-6 py-7 dark:bg-gray2">
        <p
          style={{ fontWeight: 700 }}
          className="mb-1 text-[20px] font-medium text-black dark:text-white "
        >
          <Translation text={title} />
        </p>
        <p className="text-[15px] leading-6">
          <Translation text={description} />
        </p>
      </div>
    </div>
  );
};

const BLOGS = [
  {
    image: "/images/Blog/blog-new-4.jpg",
    title: "blog.title-blog-1",
    description: "blog.content-blog-1",
  },
  {
    image: "/images/Blog/blog-new-5.png",
    title: "blog.title-blog-2",
    description: "blog.content-blog-2",
  },
  {
    image: "/images/Blog/blog-new-6.png",
    title: "blog.title-blog-3",
    description: "blog.content-blog-3",
  },
];

export default function Blog() {
  return (
    <ComponentContainer className="px-4 py-16 md:py-28 lg:py-40 xl:px-0">
      <div className="mx-auto mb-7 p-0 text-center text-black dark:text-white  md:mb-14">
        <HomeTitle className="mb-8">
          <Translation text="blog.title" />
        </HomeTitle>
        <HomeSubTitle className="mx-auto">
          <Translation text="blog.description" />
        </HomeSubTitle>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-5 md:gap-x-4 lg:gap-x-10">
        {/* {BLOGS.map((blog) => (
          <BlogItem key={blog.title} {...blog} />
        ))} */}
      </div>
      <Newsletter />
    </ComponentContainer>
  );
}
