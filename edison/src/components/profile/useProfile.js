import Info from "../../data/Info.jsx";

export const useProfile = () => {
  const { profile } = Info;
  const { profileProfession } = profile;

  const titleSection = Array.isArray(profileProfession)
    ? profileProfession.find((section) => section.title)
    : null;

  const descriptionSection = Array.isArray(profileProfession)
    ? profileProfession.find((section) => section.description)
    : null;

  const subtitleSection = Array.isArray(profileProfession)
    ? profileProfession.find((section) => section.subtitle)
    : null;

  const itemsSection = Array.isArray(profileProfession)
    ? profileProfession.find((section) => section.items)
    : null;

  const profileStrengths = itemsSection?.items?.reduce(
    (accumulatedStrengths, currentItem, itemIndex, allItems) => {
      if (currentItem.bold) {
        const adjacentDescription =
          allItems[itemIndex + 1]?.description2 ||
          allItems[itemIndex + 1]?.description ||
          "";

        accumulatedStrengths.push({
          boldTitle: currentItem.bold.endsWith(':')
            ? currentItem.bold
            : `${currentItem.bold}:`,
          descriptionText:
            currentItem.description2 ||
            currentItem.description ||
            adjacentDescription,
        });
      }
      return accumulatedStrengths;
    },
    []
  ) || [];

  return {
    title: titleSection?.title || "",
    description: descriptionSection?.description || "",
    subtitle: subtitleSection?.subtitle || "",
    strengths: profileStrengths,
  };
};

export default useProfile;
