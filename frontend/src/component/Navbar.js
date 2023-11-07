import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../store/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";

export const Navbar = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      dispatch(resetUserState());
      navigate("/");
    } catch (error) {
      toast.error("Error logging out", error);
    }
  };

  return (
    <nav className="bg-black relative">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-8">
        <div className="flex flex-row items-center gap-x-10">
          <div className="text-main-yellow text-xl">
            <Link to="/" className="font-lemon">
              TICK
            </Link>
          </div>
          <div className="lg:flex hidden text-main-yellow font-inter text-sm font-semibold mr-10">
            <Link to="/event">All Events</Link>
          </div>
        </div>

        {accessToken && (
          <div className="flex items-center gap-x-10">
            <div className="lg:flex hidden text-main-yellow font-inter text-sm font-semibold">
              <Link to="/bookmarks">My Bookmarks</Link>
            </div>

            <div className="lg:flex hidden text-main-yellow font-inter text-sm font-semibold">
              <Link to="/ticket">My Tickets</Link>
            </div>

            <button className="lg:flex hidden bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
              <Link onClick={handleLogout}>Logout</Link>
            </button>

            <button
              className="block lg:hidden text-white hover:bg-slate-700 rounded-lg px-2 py-2.5"
              onClick={() => setShowSidebar((prevState) => !prevState)}
            >
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>
        )}

        {!accessToken && (
          <button className="bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>

      {showSidebar && (
        <div
          id="drawer-navigation"
          className="block absolute left-0 top-0 z-40 w-full h-screen p-4 bg-black"
        >
          <button type="button" onClick={() => setShowSidebar(false)}>
            <svg
              aria-hidden="true"
              className="w-[30px] h-[30px]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="py-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/event"
                  className="flex items-center p-2 rounded-lg hover:bg-slate-700 group"
                  onClick={() => setShowSidebar(false)}
                >
                  <img
                    className="h-[30px] w-[30px]"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJElEQVR4nO2aMavUQBDHJ7OCYiEINmolVnbaWlhYKVr4PoJgYS/4BSz0I4jfQPwKYmMnNpZPBFG53Ex86iGZifjElbm7PI54TwO3eZvVHZgiR+4//GZmZ5MlAD2tZndFCT8oozcXwvf2W9//x9bfMxNug6wGg0T096wV3+967PrpgQi5LSUsu+XtejdQaIe++oSlkLvxe0Z6QIwKhOcwk31LmxQIr2m9/w5ER+aQQTh+FTRXhBOqSLaxmY6gTTQv9hWLndlcka7FzmzyFRHGOnkQIfzZTN1le0FSRk4WRLl4ZLG/TuCEMlZpghCWsxkct9hCxeNkW0vIbVncunLXNtGBqCBUPLGYfgeOrR7KaVIghDPZgdOLmMXDTfUgFkjDeHMer4JLNrVGBSKMIoS7f7+veOo9FP4tHBHC7RCJgVAgQvi9rtzVeuquG9CfYBuGs8spdT9UhSEgyLbtAwsNuKiMn9beS3hnPqUYzvepnkZpLcI3bba/lXBOGN917nnhPTjv4ZASvgwFoYMsdsLSsj1vnY9wShlfLSF36wouLGPcDQmhg00twi82jUzPdm0hfC5c3LPrZgpnNn1A1AMDWSzqpj0l9xM46l/DYZtUwsWz0BA69D4ihD+E8HarXRPeGgJCD2pDFCoe1BWcVMLPSYOoOeFkMG2O/dCYQTBXxMduHc1rhONnWXNF4F8av7TZIUAMl3Uf3dhbXkowMtRnUNkgjP0Cc7acXjVQ+goAAAAASUVORK5CYII="
                    alt="all events"
                  />
                  <span className="ml-5 text-main-yellow font-inter text-base font-semibold">
                    All Events
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmarks"
                  className="flex items-center p-2 rounded-lg hover:bg-slate-700 group"
                  onClick={() => setShowSidebar(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0,0,256,256"
                  >
                    <g
                      fill="#f6e902"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ "mix-blend-mode": "normal" }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M37,48c-0.17578,0 -0.34766,-0.04687 -0.50391,-0.13672l-11.49609,-6.70703l-11.49609,6.70703c-0.30859,0.17969 -0.69141,0.18359 -1,0.00391c-0.3125,-0.17969 -0.50391,-0.50781 -0.50391,-0.86719v-44c0,-0.55078 0.44922,-1 1,-1h24c0.55469,0 1,0.44922 1,1v44c0,0.35938 -0.19141,0.6875 -0.50391,0.86719c-0.15234,0.08984 -0.32422,0.13281 -0.49609,0.13281z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="ml-5 text-main-yellow font-inter text-base font-semibold">
                    My Bookmarks
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ticket"
                  className="flex items-center p-2 rounded-lg hover:bg-slate-700 group"
                  onClick={() => setShowSidebar(false)}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.6373 10.3378L26.8791 7.57955C26.6565 7.36001 26.3598 7.23182 26.0474 7.22025C25.735 7.20868 25.4297 7.31457 25.1915 7.51705C24.8238 7.83002 24.3519 7.99344 23.8694 7.97491C23.3869 7.95639 22.929 7.75728 22.5864 7.41704C22.2463 7.07446 22.0473 6.61665 22.0288 6.13429C22.0103 5.65194 22.1736 5.18022 22.4864 4.81257C22.6889 4.5744 22.7947 4.26902 22.7832 3.95663C22.7716 3.64425 22.6434 3.34753 22.4239 3.125L19.6631 0.363641C19.4298 0.130781 19.1137 0 18.7841 0C18.4544 0 18.1383 0.130781 17.905 0.363641L13.5079 4.76006C13.2364 5.03251 13.0317 5.36409 12.9098 5.72885C12.886 5.79898 12.8464 5.8627 12.7941 5.91505C12.7417 5.96741 12.678 6.00699 12.6079 6.03074C12.243 6.15268 11.9113 6.35765 11.6391 6.62951L0.363641 17.905C0.130781 18.1383 0 18.4544 0 18.7841C0 19.1137 0.130781 19.4298 0.363641 19.6631L3.125 22.4214C3.34753 22.6409 3.64425 22.7691 3.95663 22.7807C4.26902 22.7922 4.5744 22.6864 4.81257 22.4839C5.17938 22.1684 5.65188 22.0032 6.13538 22.0213C6.61887 22.0395 7.07765 22.2397 7.41977 22.5818C7.7619 22.9239 7.9621 23.3827 7.98025 23.8662C7.99841 24.3497 7.83318 24.8222 7.51767 25.189C7.3152 25.4272 7.20931 25.7325 7.22088 26.0449C7.23245 26.3573 7.36064 26.654 7.58017 26.8766L10.3384 29.6348C10.5717 29.8677 10.8879 29.9984 11.2175 29.9984C11.5471 29.9984 11.8633 29.8677 12.0966 29.6348L23.372 18.3593C23.6438 18.0872 23.8487 17.7558 23.9708 17.3912C23.9945 17.3208 24.0341 17.2569 24.0866 17.2044C24.139 17.1519 24.203 17.1123 24.2733 17.0887C24.6379 16.9667 24.9693 16.762 25.2415 16.4905L29.6379 12.0935C29.8699 11.8602 30.0001 11.5445 30 11.2155C29.9999 10.8865 29.8695 10.5709 29.6373 10.3378ZM15.3636 8.48458C15.2707 8.57747 15.1605 8.65115 15.0391 8.70142C14.9178 8.7517 14.7877 8.77757 14.6564 8.77757C14.525 8.77757 14.395 8.7517 14.2736 8.70142C14.1523 8.65115 14.042 8.57747 13.9492 8.48458L13.2298 7.76518C13.0468 7.57669 12.9453 7.32378 12.9473 7.06109C12.9493 6.7984 13.0545 6.54704 13.2403 6.36132C13.4261 6.17561 13.6775 6.07046 13.9402 6.0686C14.2029 6.06674 14.4558 6.16832 14.6442 6.35138L15.3636 7.07015C15.4565 7.16302 15.5302 7.27327 15.5804 7.39462C15.6307 7.51596 15.6566 7.64602 15.6566 7.77737C15.6566 7.90872 15.6307 8.03878 15.5804 8.16012C15.5302 8.28147 15.4565 8.39172 15.3636 8.48458ZM18.1137 11.2347C17.9262 11.4221 17.6719 11.5274 17.4068 11.5274C17.1417 11.5274 16.8874 11.4221 16.6999 11.2347L16.0124 10.5472C15.9195 10.4543 15.8458 10.344 15.7956 10.2227C15.7453 10.1013 15.7194 9.97129 15.7194 9.83995C15.7194 9.70861 15.7453 9.57855 15.7956 9.45721C15.8458 9.33586 15.9195 9.22561 16.0124 9.13273C16.1999 8.94517 16.4543 8.8398 16.7196 8.8398C16.8509 8.8398 16.981 8.86567 17.1023 8.91593C17.2237 8.96619 17.3339 9.03986 17.4268 9.13273L18.1143 9.82026C18.2075 9.91312 18.2815 10.0235 18.332 10.145C18.3825 10.2665 18.4085 10.3967 18.4086 10.5283C18.4086 10.6599 18.3827 10.7901 18.3323 10.9117C18.282 11.0332 18.2081 11.1436 18.115 11.2366L18.1137 11.2347ZM20.8638 13.9848C20.771 14.0777 20.6607 14.1514 20.5394 14.2016C20.418 14.2519 20.288 14.2778 20.1566 14.2778C20.0253 14.2778 19.8952 14.2519 19.7739 14.2016C19.6525 14.1514 19.5423 14.0777 19.4494 13.9848L18.7619 13.2973C18.5789 13.1088 18.4774 12.8559 18.4794 12.5932C18.4814 12.3305 18.5866 12.0791 18.7724 11.8934C18.9582 11.7077 19.2096 11.6026 19.4723 11.6007C19.735 11.5988 19.9879 11.7004 20.1763 11.8835L20.8638 12.571C20.9573 12.6637 21.0315 12.7739 21.0823 12.8954C21.1331 13.0169 21.1593 13.1472 21.1596 13.2788C21.1599 13.4105 21.1342 13.5409 21.084 13.6625C21.0338 13.7842 20.96 13.8948 20.8669 13.9879L20.8638 13.9848ZM23.6408 16.7687C23.5479 16.8615 23.4377 16.9352 23.3163 16.9855C23.195 17.0358 23.0649 17.0616 22.9336 17.0616C22.8022 17.0616 22.6722 17.0358 22.5508 16.9855C22.4295 16.9352 22.3192 16.8615 22.2264 16.7687L21.5113 16.0499C21.4165 15.9573 21.341 15.8468 21.2893 15.7248C21.2375 15.6027 21.2106 15.4716 21.2099 15.3391C21.2093 15.2066 21.235 15.0752 21.2856 14.9527C21.3362 14.8302 21.4106 14.719 21.5045 14.6255C21.5985 14.532 21.7101 14.4581 21.8328 14.4081C21.9556 14.3581 22.0871 14.3331 22.2196 14.3343C22.3521 14.3356 22.4831 14.3632 22.6049 14.4156C22.7266 14.4679 22.8368 14.5439 22.9289 14.6392L23.6446 15.3574C23.7374 15.4503 23.811 15.5605 23.8613 15.6819C23.9115 15.8033 23.9373 15.9334 23.9372 16.0647C23.9372 16.196 23.9112 16.3261 23.8609 16.4474C23.8106 16.5687 23.7369 16.679 23.6439 16.7718L23.6408 16.7687Z"
                      fill="#F6E902"
                    />
                  </svg>
                  <span className="ml-5 text-main-yellow font-inter text-base font-semibold">
                    My Tickets
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
