/* Contacto comercial: mantém os identificadores usados pelo template EmailJS existente. */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const button = document.getElementById('contact-submit');
  const buttonText = button.querySelector('span');
  const initialText = buttonText.textContent;

  const showStatus = (message, type) => {
    status.hidden = false;
    status.className = 'contact-status contact-status--' + type;
    status.setAttribute('role', type === 'error' ? 'alert' : 'status');
    status.textContent = message;
  };

  const emailInput = document.getElementById('from_email');
  const confirmInput = document.getElementById('email_confirm');
  const emailError = document.getElementById('email-error');
  const confirmError = document.getElementById('email-confirm-error');
  const domains = {
    'gmail.con': 'gmail.com', 'gamil.com': 'gmail.com', 'gmial.com': 'gmail.com',
    'gmail.co': 'gmail.com', 'hotmai.com': 'hotmail.com', 'hotmail.con': 'hotmail.com',
    'outlok.com': 'outlook.com', 'outlook.con': 'outlook.com',
    'yahoo.con': 'yahoo.com', 'icloud.con': 'icloud.com'
  };

  const fieldError = (input, element, message) => {
    input.setCustomValidity(message);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    element.textContent = message;
    element.hidden = !message;
    return !message;
  };

  const checkEmail = () => {
    const address = emailInput.value.trim();
    // Exigimos um domínio plausível, sem espaços, sem pontos consecutivos e com TLD.
    const parts = address.split('@');
    const valid = parts.length === 2 &&
      /^[^\s@.][^\s@]*$/.test(parts[0]) && !parts[0].includes('..') &&
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(parts[1]);
    let message = '';
    if (!address) message = 'Indica o teu endereço de email.';
    else if (!valid) message = 'Escreve um email válido, por exemplo nome@empresa.pt.';
    else if (domains[parts[1].toLowerCase()]) {
      message = 'Confirma o domínio: querias escrever ' + domains[parts[1].toLowerCase()] + '?';
    }
    return fieldError(emailInput, emailError, message);
  };

  const checkConfirmation = () => {
    const email = emailInput.value.trim();
    const confirmation = confirmInput.value.trim();
    let message = '';
    if (!confirmation) message = 'Repete o teu email para confirmar.';
    else if (confirmation.toLowerCase() !== email.toLowerCase()) message = 'Os endereços de email não coincidem.';
    return fieldError(confirmInput, confirmError, message);
  };

  emailInput.addEventListener('blur', checkEmail);
  confirmInput.addEventListener('blur', checkConfirmation);
  emailInput.addEventListener('input', () => {
    fieldError(emailInput, emailError, '');
    if (confirmInput.value) checkConfirmation();
  });
  confirmInput.addEventListener('input', () => {
    if (confirmInput.value) checkConfirmation();
    else fieldError(confirmInput, confirmError, '');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.hidden = true;
    if (!checkEmail() || !checkConfirmation()) {
      showStatus('Verifica o endereço de email e a confirmação antes de enviar.', 'error');
      const invalid = form.querySelector('[aria-invalid="true"]');
      if (invalid) invalid.focus();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      showStatus('Verifica os campos obrigatórios e a aceitação da informação de privacidade.', 'error');
      return;
    }

    const clean = (id) => document.getElementById(id).value.trim();
    // Os templates EmailJS existentes costumam utilizar {{subject}} e {{message}}.
    document.getElementById('subject').value = 'Pedido de orçamento — ' + (clean('business_name') || clean('from_name'));
    document.getElementById('message').value = [
      'Nome: ' + clean('from_name'),
      'Email: ' + clean('from_email'),
      'Negócio: ' + (clean('business_name') || 'Não indicado'),
      'Tipo de website: ' + clean('website_type'),
      'Orçamento previsto: ' + clean('budget'),
      '',
      'Descrição do projeto:',
      clean('project_description')
    ].join('\n');

    button.disabled = true;
    buttonText.textContent = 'A enviar...';
    showStatus('A enviar o teu pedido...', 'progress');
    try {
      if (!window.emailjs || typeof window.emailjs.sendForm !== 'function') {
        throw new Error('Serviço de envio indisponível');
      }
      window.emailjs.init({publicKey: '71lMnUL-Wk-d9cHqM'});
      await window.emailjs.sendForm('service_iazw862', 'template_kwqal0t', form);
      form.reset();
      showStatus('O pedido foi submetido com sucesso. Obrigado pelo contacto!', 'success');
    } catch (error) {
      console.error('Falha ao enviar pedido:', error);
      showStatus('Não foi possível enviar o pedido. Tenta novamente ou contacta-me pelo WhatsApp/email.', 'error');
    } finally {
      button.disabled = false;
      buttonText.textContent = initialText;
    }
  });
});
