import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/';
import { Searchbar } from './Searchbar/';
import { FetchImages } from './Utils/PixabayApi';
import { Loader } from './Loader/';
import { ButtonLoadMore } from './Button/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await FetchImages(query, page);

        if (totalHits === 0) {
          toast.warning(
            'Sorry, there are no images matching your search query. Please try again!'
          );
          return;
        }

        if (page === 1) {
          toast.success(`${totalHits} images found`);
        }

        setItems(prevItems => [...prevItems, ...hits]);

        if (page >= Math.ceil(totalHits / 12)) {
          return setShowLoadMore(false);
        }

        setShowLoadMore(true);
      } catch (error) {
        errorMesage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, query]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const errorMesage = message => {
    toast.error(`Oops, something went wrong: ${message}`);
  };

  const handleFormSubmit = searchQuery => {
    if (searchQuery === query) {
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setItems([]);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery items={items} />

      {query !== '' &&
        items.length !== 0 &&
        isLoading !== true &&
        showLoadMore && (
          <ButtonLoadMore type="button" onClick={onLoadMore}>
            Load more
          </ButtonLoadMore>
        )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2500}></ToastContainer>
    </div>
  );
};
