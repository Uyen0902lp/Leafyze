import Image from "next/image";
import { ICategory } from "@/types/category-d-t";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/utils/utils";

// prop type
type IProps = {
  showCategory: boolean;
  categories:ICategory[]
};
export default function HeaderTopCategories({ showCategory,categories }: IProps) {
  const router = useRouter();
  let content = null;

   if (categories && categories?.length > 0) {
    content = showCategory && (
      <ul>
        {categories.map((item:ICategory) => (
          <li key={item.id} className={item.subcategories.length > 0 ? "has-dropdown" : ""}>
            <a className="pointer" onClick={() => router.push(`/shop?parentCategory=${item.slug}`)}>
              <span>
                <Image
                  src={`${item.image}`}
                  alt="cate img"
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  width={35}
                  height={35}
                />
              </span>
              {item.title}
            </a>

            {item.subcategories.length > 0 && (
              <ul className="tp-submenu">
                {item.subcategories.map((child) => (
                  <li key={child.id}>
                    <a className="pointer" 
                    onClick={() => router.push(`/shop?category=${generateSlug(child.title)}`)}>
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
      <nav className="tp-category-menu-content">{content}</nav>
    </div>
  );
}
