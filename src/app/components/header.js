import { BookA } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkProvider,
} from "@clerk/nextjs";
import { MenuBtn } from "./menu-btn";

// Use the publishable key from environment variables
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const Header = () => {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <header className="sticky inset-x-0 top-0 z-30 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <BookA className="w-7 h-7 text-amber-500" />
              <span className="text-xl font-semibold text-gray-100">
                TranslateApp
              </span>
            </div>

            {/* Authentication / User Menu */}
            <div>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4">
                  <MenuBtn />
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>
    </ClerkProvider>
  );
};
