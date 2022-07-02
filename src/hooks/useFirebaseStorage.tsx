import { getDownloadURL, listAll, StorageReference } from 'firebase/storage';
import { useEffect, useState } from 'react';

const useFirebaseStorage = (ref: StorageReference) => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    listAll(ref)
      .then((res) => {
        const promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises)
          .then((urls) => {
            setData((prevState) => [...prevState, ...urls]);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return data;
};

export default useFirebaseStorage;
