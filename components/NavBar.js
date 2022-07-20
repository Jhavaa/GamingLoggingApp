import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import brand from "/public/derpLMAO.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { themeChange } from "theme-change";

function NavBar() {
  const { data, status } = useSession();
  const themeValues = ["cupcake", "cyberpunk", "light", "dark", "bumblebee"];
  useEffect(() => {
    themeChange(false);
  });
  return (
    <>
      <div class="navbar bg-primary">
        <div class="flex-1">
          <Link href="/">
            <a
              class="btn btn-ghost normal-case text-xl primary-content"
              href="/"
            >
              G-List
            </a>
          </Link>
        </div>
        <div class="flex-none">
          {/* <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabindex="0"
            class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div class="card-body">
              <span class="font-bold text-lg">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div> */}
          <div class="flex-none">
            <ul class="menu menu-horizontal p-0 primary-focus">
              <li>
                <select data-choose-theme>
                  <option value="">default</option>
                  {themeValues.map((value) => (
                    <option
                      className="text-primary"
                      key={value.toLowerCase()}
                      value={value.toLowerCase()}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/testImages">
                  <a>Test Images</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Page3</a>
                </Link>
              </li>
            </ul>
          </div>
          <div class="dropdown dropdown-end text-white">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-blue-900 rounded-box w-52"
            >
              <li>
                <a class="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
