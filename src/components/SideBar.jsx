import React, { Fragment, useEffect, useState } from "react";
import SubCard from "./SubCard";
import { Link } from "react-router-dom";

function SideBar({ setShowSidebar }) {
  const data = [
    {
      icon_img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuv06wP8bfq83ulYT_RjvA6ckSZmq6r1b9cpXfPiY6qS_cDFQRBDFiJVyHhFAxDaqyR4",
      display_name_prefixed: "r/all",
    },
    {
      icon_img:
        "https://t4.ftcdn.net/jpg/03/38/92/81/360_F_338928104_6b4Nhr5PxIIVc1RxB8zCP9YWw8kgqnEm.jpg",
      display_name_prefixed: "r/popular",
    },
  ];

  // useEffect(() => {
  //   localStorage.setItem("subscriptions", JSON.stringify(data));
  // });

  const [subs, SetSubs] = useState([]);

  const updateChannels = () => {
    // console.log(subs);
    SetSubs(JSON.parse(localStorage.getItem("subscriptions")));
    // setChannels(JSON.parse(localStorage.getItem('channels')) || []);
  };
  useEffect(() => {
    updateChannels();
    window.addEventListener("channelsUpdated", updateChannels);

    return () => {
      window.removeEventListener("channelsUpdated", updateChannels);
    };
  }, []);

  return (
    <div onClick={() => setShowSidebar(false)}>
      <SubCard data={data[0]} />
      <SubCard data={data[1]} />
      <Link
        to={"/"}
        style={{ width: "auto", display: "flex", justifyContent: "center" }}
        className="label noselect cursor-pointer"
      >
        Home
      </Link>
      <br />
      <Link
        to={"/liked"}
        style={{ width: "auto", display: "flex", justifyContent: "center" }}
        className="label noselect cursor-pointer"
      >
        Liked Posts
      </Link>
      <br />
      <hr style={{ opacity: ".5", marginBottom: "10px" }} />
      {/* <br /> */}
      <h3>Subscribed subs</h3>

      {subs?.map((item) => {
        return (
          <Fragment key={item.display_name_prefixed}>
            <SubCard data={item} />
          </Fragment>
        );
      })}

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default SideBar;
