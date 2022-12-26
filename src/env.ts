export interface IProjectItem {
  title: string;
  link: string;
}

interface IProjects {
  todo: string;
  shop: string;
  chat: string;
}

interface IContactItem {
  title: string;
  link: string;
  localLink: string;
}

interface IContacts {
  github: IContactItem;
  gmail: IContactItem;
  telegram: IContactItem;
  hh: IContactItem;
  skype: IContactItem;
}

interface IFrameworks {
  react: IProjectItem;
  angular: IProjectItem;
  vue: IProjectItem;
}

export const URL_FRAMEWORKS: IFrameworks = {
  angular: {
    title: "angular",
    link: "https://any-dea-angular.web.app",
  },
  react: {
    title: "react",
    link: "https://anydea-react.web.app",
  },
  vue: {
    title: "vue",
    link: "https://anydea-vue.web.app/",
  },
};

export const URL_GIT_PROJECTS: IProjects = {
  todo: "https://github.com/XCrones/portfolio-react/tree/main/src/components/todo",
  shop: "https://github.com/XCrones/portfolio-react/tree/main/src/components/shop",
  chat: "https://github.com/XCrones/portfolio-react/tree/main/src/components/chat",
};

export const CONTACT_LINKS: IContacts = {
  github: {
    title: "github",
    link: "https://github.com/XCrones/portfolio-react",
    localLink: "XCrones",
  },
  gmail: {
    title: "gmail",
    link: "mailto:Lymar.Serjey@gmail.com",
    localLink: "Lymar.Serjey@gmail.com",
  },
  telegram: {
    title: "telegram",
    link: "https://t.me/LymarSerjey",
    localLink: "@LymarSerjey",
  },
  hh: {
    title: "hh",
    link: "https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios",
    localLink: "https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios",
  },
  skype: {
    title: "skype",
    link: "skype:Lymar.Serjey@gmail.com?userinfo",
    localLink: "Lymar.Serjey@gmail.com",
  },
};
