import Book from "../../../../public/book_image.png";
import Search from "../../../../public/search_image.png";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="text-center pt-3 pb-5 w-full bg-green-900 fixed bottom-0">
      <nav>
        <Button href="/" icon={Book} page="書庫"/>
        <Button href="/search-books" icon={Search} page="検索"/>
      </nav>
    </footer>
  );
};

export default Footer;
