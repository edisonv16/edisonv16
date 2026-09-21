import { useState, useMemo } from 'react';
import InfoEducation from '../../data/InfoEducation.jsx';

const CATEGORY_META = {
  1: {
    icon: 'fa-certificate',
    shortLabel: 'Certificaciones',
    milestone: '01',
    description: 'Certificaciones internacionales y credenciales profesionales recientes'
  },
  2: {
    icon: 'fa-code',
    shortLabel: 'Platzi & JS',
    milestone: '02',
    description: 'Ruta de aprendizaje en desarrollo frontend y JavaScript moderno'
  },
  3: {
    icon: 'fa-paint-brush',
    shortLabel: 'Diseño UX/UI',
    milestone: '03',
    description: 'Diseño de interfaces, experiencia de usuario y comunicación visual'
  },
  4: {
    icon: 'fa-laptop-code',
    shortLabel: 'Desarrollo Web',
    milestone: '04',
    description: 'Diplomados, programación web y formación complementaria'
  },
  5: {
    icon: 'fa-layer-group',
    shortLabel: 'Especializada',
    milestone: '05',
    description: 'Arquitectura frontend avanzada, microfrontends y seguridad cloud'
  },
  6: {
    icon: 'fa-trophy',
    shortLabel: 'Premios',
    milestone: '06',
    description: 'Distinciones periodísticas nacionales e internacionales'
  }
};

export const useEducation = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    return (InfoEducation?.education || []).map((categoryGroup) => {
      const metadata = CATEGORY_META[categoryGroup.id] || {
        icon: 'fa-graduation-cap',
        shortLabel: categoryGroup.institucion,
        milestone: String(categoryGroup.id).padStart(2, '0'),
        description: ''
      };

      const normalizedCourses = (categoryGroup.curso || []).map((courseItem) => {
        const yearMatch = courseItem.fecha ? courseItem.fecha.match(/\b(19\d\d|20\d\d)\b/) : null;
        const extractedYear = yearMatch ? yearMatch[0] : null;

        let badgeType = 'default';
        let badgeLabel = extractedYear;
        let badgeIcon = 'fa-calendar-check-o';

        if (!extractedYear) {
          if (categoryGroup.id === 6) {
            badgeType = 'award';
            badgeLabel = 'Distinción';
            badgeIcon = 'fa-trophy';
          } else if (categoryGroup.id === 5) {
            badgeType = 'specialized';
            badgeLabel = 'Especialidad';
            badgeIcon = 'fa-star';
          } else {
            badgeType = 'certified';
            badgeLabel = 'Acreditado';
            badgeIcon = 'fa-check-circle';
          }
        }

        const issuerName = courseItem.institucion || (
          categoryGroup.id === 2 ? 'Platzi' : ''
        );

        const skillsList = courseItem.aptitudes
          ? courseItem.aptitudes.split(',').map((skillItem) => skillItem.trim()).filter(Boolean)
          : [];

        return {
          id: courseItem.id,
          title: courseItem.curso,
          issuer: issuerName,
          dateText: courseItem.fecha || '',
          year: extractedYear,
          badgeLabel,
          badgeType,
          badgeIcon,
          skills: skillsList
        };
      });

      return {
        id: categoryGroup.id,
        title: categoryGroup.institucion,
        shortLabel: metadata.shortLabel,
        icon: metadata.icon,
        milestone: metadata.milestone,
        description: metadata.description,
        courses: normalizedCourses,
        totalCourses: normalizedCourses.length
      };
    });
  }, []);

  const totalAllCourses = useMemo(() => {
    return categories.reduce((runningTotal, currentCategory) => {
      return runningTotal + currentCategory.totalCourses;
    }, 0);
  }, [categories]);

  const categoryFilters = useMemo(() => {
    const allFilter = {
      id: 'all',
      label: 'Todos',
      count: totalAllCourses
    };

    const specificFilters = categories.map((categoryItem) => ({
      id: categoryItem.id,
      label: categoryItem.shortLabel,
      count: categoryItem.totalCourses
    }));

    return [allFilter, ...specificFilters];
  }, [categories, totalAllCourses]);

  const displayedCategories = useMemo(() => {
    if (selectedCategory === 'all') {
      return categories;
    }
    return categories.filter((categoryItem) => categoryItem.id === selectedCategory);
  }, [categories, selectedCategory]);

  return {
    categories: displayedCategories,
    allCategoriesCount: categories.length,
    totalAllCourses,
    selectedCategory,
    setSelectedCategory,
    categoryFilters
  };
};

export default useEducation;
