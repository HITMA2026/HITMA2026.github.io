"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开导航菜单");
  navigation.classList.remove("open");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
  navigation.classList.toggle("open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    let count = 0;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    document.getElementById("filter-status").textContent =
      `显示 ${count} 个项目`;
  }),
);

const projects = {
  fixed: {
    title: "固定翼与复合材料无人机",
    label: "01 / AIRCRAFT DESIGN",
    image: "assets/fixed-wing.webp",
    alt: "地面测试中的复合材料固定翼无人机",
    description:
      "协会拥有固定翼航模的设计与制作经验，围绕气动仿真分析、结构设计与飞行控制开展工程实践。根据协会介绍材料，团队与深空探测基础研究中心合作开展固定翼无人机智能控制研究，并与复合材料与结构研究所合作探索复合材料无人机智能传感。让设计走出图纸，在飞行试验中不断完善。",
    tags: ["气动仿真分析", "结构设计", "复合材料", "飞行控制"],
  },
  drone: {
    title: "智能四旋翼",
    label: "02 / AUTONOMOUS FLIGHT",
    image: "assets/autonomous-drone.webp",
    alt: "室内场地的智能四旋翼飞行试验",
    description:
      "在空间控制与惯性技术研究中心指导下，智能四旋翼项目研究无人机自主识别、追踪、避障等任务的方法，探索轨迹规划与控制、多智能无人体协同等方向。从感知环境到规划航迹，再到稳定执行，在一项项实际任务中理解自主飞行。",
    tags: ["自主识别", "轨迹规划", "避障控制", "多机协同"],
  },
  rocket: {
    title: "多级模型火箭",
    label: "03 / ROCKET ENGINEERING",
    image: "assets/rocket-launch.webp",
    alt: "校园航天日活动中的模型火箭发射",
    description:
      "多级模型火箭是协会竞赛与创新实践的方向之一。成员通过理论学习、制造工艺实践与团队协作，将航天知识带入工程项目。协会也在学校航天日系列活动中参与模型火箭发射表演和亲子制作，以可见的发射实践，让更多人走近航天。",
    tags: ["模型火箭", "工程实践", "航天日", "航空航天科普"],
  },
  solar: {
    title: "长航时太阳能无人机",
    label: "04 / SOLAR-POWERED FLIGHT",
    image: "assets/solar-flight.webp",
    alt: "在开阔场地飞行的太阳能固定翼航模",
    description:
      "长航时太阳能无人机是协会介绍材料列出的创新作品，太阳能飞机任务飞行也是协会参与的竞赛方向。围绕能源利用与飞行器设计，成员在具体项目中学习气动、结构与控制，让跨学科知识在真实任务中彼此连接。",
    tags: ["太阳能飞机", "长航时探索", "飞行器设计", "任务飞行"],
  },
};
const dialog = document.querySelector(".project-dialog");
const dialogImage = document.getElementById("dialog-image");
cards.forEach((card) =>
  card.addEventListener("click", () => {
    const project = projects[card.dataset.project];
    dialogImage.src = project.image;
    dialogImage.alt = project.alt;
    document.getElementById("dialog-label").textContent = project.label;
    document.getElementById("dialog-title").textContent = project.title;
    document.getElementById("dialog-description").textContent =
      project.description;
    const tags = document.getElementById("dialog-tags");
    tags.replaceChildren(
      ...project.tags.map((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        return element;
      }),
    );
    dialog.showModal();
  }),
);
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
document
  .querySelector(".dialog-contact")
  .addEventListener("click", () => dialog.close());

if ("IntersectionObserver" in window) {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("js-motion");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));
  }
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navigation.querySelectorAll("a").forEach((link) => {
            if (link.hash === `#${entry.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      });
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => navigationObserver.observe(section));
}
document.getElementById("copyright-year").textContent =
  new Date().getFullYear();
