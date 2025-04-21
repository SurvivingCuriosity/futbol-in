import { Step } from "intro.js-react";

export const steps:Step[] = [
    {
      element: '.tour-inicio',
      intro: 'Aquí podrás ver notificaciones e información sobre las competiciones a las que estás inscrito',
      position: 'top',
      tooltipClass: 'text-neutral-900',
      highlightClass: 'intro-h bg-primary/20',
      title: 'Inicio'
    },
    {
      element: '.tour-buscar',
      intro: 'En "buscar" podrás buscar futbolines en cualquier ciudad de España',
      position: 'top',
      tooltipClass: 'text-neutral-900',
      highlightClass: 'intro-h bg-primary/20',
      title: 'Buscar futbolines'
    },
    {
      element: '.tour-agregar',
      intro: 'Aquí podrás agregar nuevos futbolines',
      position: 'top',
      tooltipClass: 'text-neutral-900',
      highlightClass: 'intro-h bg-primary/20',
      title: 'Agregar futbolines'
    },
    {
      element: '.tour-ranking',
      intro: 'Aquí podrás ver el ranking de usuarios y las ligas y torneos disponibles en diferentes ciudades',
      position: 'top',
      tooltipClass: 'text-neutral-900',
      highlightClass: 'intro-h bg-primary/20',
      title: 'Zona competitivo'
    },
    {
      element: '.tour-perfil',
      intro: 'Aquí podrás editar tu perfil, crear equipos etc.',
      position: 'top',
      tooltipClass: 'text-neutral-900',
      highlightClass: 'intro-h bg-primary/20',
      title: 'Perfil'
    },
  ];