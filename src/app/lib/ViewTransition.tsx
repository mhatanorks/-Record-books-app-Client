import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { FC, useCallback } from "react";

const ViewTransition: FC<any> = ({ children, href }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    
    // navボタンから現在のリンクを押した際のアニメーションの再発動防止
    if (!href.endsWith("/")) {
      if (location.href.endsWith(href)) {
        return;
      }
    }

    // viewTransitions未対応ブラウザの挙動
    if (!(document as any).startViewTransition) {
      // router.push(href);
      return;
    }
    // viewTransitions対応ブラウザの挙動
    (document as any).startViewTransition(async () => {
      // await router.push(href);
    });
  }, [href]);
  return (
    <Link href={`${href}`} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ViewTransition;
