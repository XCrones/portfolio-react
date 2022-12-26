interface IRouterLinkItem {
  link: string;
  title: string;
}

interface IRouterLinks {
  home: IRouterLinkItem;
  projects: {
    link: string;
    title: string;
    children: {
      todo: IRouterLinkItem;
      shop: IRouterLinkItem;
      chat: IRouterLinkItem;
    };
  };
  contacts: IRouterLinkItem;
}

export const ROUTER_LINKS: IRouterLinks = {
  home: {
    link: "/",
    title: "главная",
  },
  projects: {
    link: "/projects",
    title: "проекты",
    children: {
      todo: {
        link: "todo",
        title: "todo",
      },
      shop: {
        link: "shop",
        title: "shop",
      },
      chat: {
        link: "chat",
        title: "chat",
      },
    },
  },
  contacts: {
    link: "/contacts",
    title: "контакты",
  },
};
