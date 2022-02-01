/**
 * Icon Directive: render an fa-icon
 */
export default {
  // Se ejecuta antes de que el elemnto sea agreado al documento
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value}  text-xl`;

    if (binding.arg === 'full') {
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      iconClass += ' float-right';
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    } else {
      iconClass += ' text-green-400';
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
