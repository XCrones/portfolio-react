import React, { useEffect, useState } from "react";
import boxShadow, { IBoxShadow } from "../../components/ui/boxShadow";
import { useAppSelector } from "../../hooks/redux";

interface IContact {
  service: string;
  img: string;
  link: string;
  localLink: string;
  nickName: string;
}

const ContactsPage = () => {
  const contacts: IContact[] = [
    {
      service: "gitHub",
      img: "github",
      link: "https://github.com/XCrones",
      localLink: "XCrones",
      nickName: "XCrones",
    },
    {
      service: "gmail",
      img: "gmail",
      link: "mailto:Lymar.Serjey@gmail.com",
      localLink: "Lymar.Serjey@gmail.com",
      nickName: "Лымарь Сергей",
    },
    {
      service: "telegram",
      img: "telegram",
      link: "https://t.me/LymarSerjey",
      localLink: "@LymarSerjey",
      nickName: "Лымарь Сергей",
    },
    {
      service: "hh",
      img: "hh",
      link: "https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios",
      localLink: "https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios",
      nickName: "Лымарь Сергей",
    },
    {
      service: "skype",
      img: "skype",
      link: "skype:Lymar.Serjey@gmail.com?userinfo",
      localLink: "Lymar.Serjey@gmail.com",
      nickName: "Лымарь Сергей",
    },
  ];

  const [activeLink, setActiveLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const bgBlue = "#343c4e";
  const bgLink = "#284ca0";

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const { blueNeon, blueShadow } = useAppSelector((state) => state.appCommon.shadow);
  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const toggleLink = (link: string) => {
    setActiveLink(activeLink === link ? "" : link);
    setIsCopied(false);
  };

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (e) {
      setIsCopied(false);
    }
  };

  const makePathImg = (img: string): string => require(`../../assets/img/contacts/${img}.png`);
  const isActiveLink = (service: string): boolean => service === activeLink;
  const isLastIdx = (idx: number): boolean => idx === contacts.length - 1;
  const isFirstIdx = (idx: number): boolean => idx === 0;

  const boxNeon: IBoxShadow = {
    style: styleShadowMedium,
    color: blueNeon,
    isNeon: isNeon,
    activeHover: false,
    isHover: false,
  };

  useEffect(() => {
    let time = 300;
    for (let index = 0; index < contacts.length; index++) {
      const element = contacts[index];
      setTimeout(() => {
        toggleLink(element.service);
      }, time);
      time += 300;
    }
    setTimeout(() => {
      toggleLink("");
    }, time);
    return () => {};
  }, []);

  return (
    <div className="flex flex-col h-full w-full text-white justify-center items-center py-8 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {contacts.map((contact: IContact, idx) => (
          <button
            key={contact.link}
            className={`capitalize flex flex-col lg:flex-row items-center transition-all ease-show-contact duration-[400ms] 
            relative ${
              isActiveLink(contact.service) ? "-translate-x-[80%] lg:-translate-x-[0px] lg:-translate-y-[120px]" : ""
            }`}
          >
            {!isFirstIdx(idx) && (
              <div
                className={`h-9 lg:h-1 w-1 lg:w-9 transition-all duration-300 
                    ${!isLastIdx(idx) && isActiveLink(contact.service) ? "scale-0" : ""}`}
                style={{ background: blueShadow, ...boxShadow(boxNeon) }}
              ></div>
            )}
            <div
              onClick={() => toggleLink(contact.service)}
              style={{ ...boxShadow(boxNeon), borderColor: blueShadow, background: bgBlue }}
              className="inline-block rounded-2xl p-4 lg:p-6 transition-all duration-300 border-[5px] border-solid"
            >
              <div className="w-[64px] h-[64px]">
                <img
                  className={`transition-all duration-300 w-full h-full 
                  ${isActiveLink(contact.service) ? "grayscale" : ""} ${
                    !isActiveLink(contact.service) ? "grayscale-0" : ""
                  }`}
                  src={makePathImg(contact.img)}
                  alt="contact.img"
                />
              </div>
            </div>
            {!isLastIdx(idx) && (
              <div
                className={`h-9 lg:h-1 w-1 lg:w-9 transition-all duration-300 ${
                  !isLastIdx(idx) && isActiveLink(contact.service) ? "scale-0 lg:scale-100" : ""
                }`}
                style={{ background: blueShadow, ...boxShadow(boxNeon) }}
              ></div>
            )}
            <div
              className={`absolute top-1/2 -translate-y-1/2 flex flex-row items-center 
              gap-x-2 transition-all duration-[200] ease-show-elem 
              ${isLastIdx(idx) ? "left-[130%] lg:-left-[60%]" : "left-[129%] lg:left-[110%]"}
              ${isActiveLink(contact.service) ? "opacity-1 scale-1" : "opacity-0 scale-0"}`}
            >
              <div onClick={() => onCopy(contact.localLink)} className="">
                {!isCopied && (
                  <span
                    className={`material-icons !text-3xl hover:text-[#00c3ff] 
                    transition-all duration-300 border-2 border-solid rounded-lg`}
                    style={{ background: bgBlue, borderColor: bgLink }}
                  >
                    add_link
                  </span>
                )}
                {isCopied && (
                  <span
                    className="material-icons text-green-500 !text-3xl hover:text-[#00c3ff] transition-all duration-300 border-2 border-solid rounded-lg"
                    style={{ background: bgBlue, borderColor: bgLink }}
                  >
                    done
                  </span>
                )}
              </div>
              <a className="" href={contact.link}>
                <span
                  className="material-icons !text-3xl hover:text-[#00c3ff] transition-all duration-300 border-2 border-solid rounded-lg"
                  style={{ background: bgBlue, borderColor: bgLink }}
                >
                  arrow_outward
                </span>
              </a>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
