"use client";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const { userId } = useCart();

  // Note: Cart is preserved for historical reference
  useEffect(() => {
    console.log("[Success] Order completed, cart preserved for user:", userId);
    // Cart items remain in MongoDB for order tracking and history
    // Query the orders collection with user_email to see order history
  }, [userId]);

  const handleContinueShopping = () => {
    router.push("/all-products");
  };

  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center w-full py-24 mt-16 gap-5 bg-tint-1">
        <p className="icon">
          <svg
            color="#47523A"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="70"
            width="70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
            ></path>
          </svg>
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">
          Thank you for your order!
        </h1>
        <p className="text-sm text-ink/60">
          Check your email inbox for the receipt
        </p>
        <p className="text-sm text-ink/60 mt-1">
          If you have any questions, please email{" "}
          <a href="mailto:aivirtualtryonmirror@gmail.com" className="text-olive underline">
            aivirtualtryonmirror@gmail.com
          </a>
        </p>
        <Button onClick={handleContinueShopping} className="mt-3 h-[52px] px-16">
          Continue Shopping
        </Button>
      </div>
    </Wrapper>
  );
};
export default SuccessPage;
