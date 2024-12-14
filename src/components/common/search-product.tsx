import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  // console.log('----------',item);

  let galleryImgs: string[] = [];
  if (item.gallery) {
    try {
      galleryImgs = Array.isArray(item.gallery)
        ? item.gallery
        : JSON.parse(item.gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }

  return (
    <Link
      href={`${ROUTES.PRODUCT}/${item?.title.toLowerCase()}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-12 h-12 overflow-hidden rounded-md cursor-pointer shrink-0 ltr:mr-4 rtl:ml-4">
        {/* <Image
          // src={item?.image?.thumbnail ?? searchProductPlaceholder}
          src={item?.image.replace('4000', '5055') ?? searchProductPlaceholder} */}

        {Array.isArray(galleryImgs) && galleryImgs?.length > 0 ? (
          <Image
            src={galleryImgs[0].replace('4000', '5055')}
            width={48}
            height={48}
            loading="eager"
            alt={item.name || 'Product Image'}
            className="object-cover bg-fill-thumbnail"
            style={{ width: 'auto' }}
          />
        ) : (
          <Image
            src={
              item?.image.replace('4000', '5055') ?? searchProductPlaceholder
            }
            width={48}
            height={48}
            loading="eager"
            alt={item.name || 'Product Image'}
            className="object-cover bg-fill-thumbnail"
            style={{ width: 'auto' }}
          />
        )}
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-brand-dark text-15px">{item.title}</h3>
        {/*  className="truncate text-brand-dark text-15px">{item.name}</h3> */}
      </div>
    </Link>
  );
};

export default SearchProduct;
