import { db } from '@/firebase';
import LayoutGPT from "@widgets/gpt/LayoutGPT";
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

 /**
  * 파이어베이스 관리자에서 아래 권한을 수정해야 처리된다.
  * 
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
false 를 true 고쳐야 정상작동한다
  */
  useEffect(() => {
    
    async function getCities() {
      console.log("useEffect start 2 ");
      const citiesCol = collection(db, "posts");
      console.log('citiesCol', citiesCol);
          
      const citySnapshot = await getDocs(citiesCol);
      console.log('citySnapshot', citySnapshot);
      const cityList = citySnapshot.docs.map((doc) => {
        console.log(doc);
        return doc.data() as Post;
      });
      console.log("cityList 1", cityList);
      console.log("cityList 2", citiesCol, db);


      setPosts(cityList);
      setLoading(false);


      /* const docRef = doc(db, "posts", "1");
        console.log('docRef - ', docRef);
        // 참조에 대한 Snapshot 쿼리
        const docSnap = await getDoc(docRef);
        console.log('docSnap - ', docSnap, docSnap.data());

      setPosts([]);
      setLoading(false); */
      //return cityList;
    }
    return () => {
      getCities()
    }
  }, []);

  return (
    <LayoutGPT>
      <div>
        <h1>Community</h1>
        <button onClick={() => {}}>test add data</button>
        <button onClick={() => {}}>test2 add data</button>

        {loading && <div>Loading...</div>}
        {!loading &&
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.id}@{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
      </div>
    </LayoutGPT>
  );
};

export default Community;
