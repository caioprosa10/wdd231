// main.js

// Função para buscar e exibir os dados dos membros
async function loadMembers() {
  try {
      // O caminho "data/members.json" é relativo ao arquivo HTML (directory.html)
      const response = await fetch('data/members.json');
      if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
      }
      const members = await response.json();
      displayMembers(members);
  } catch (error) {
      console.error('Erro ao buscar os dados dos membros:', error);
  }
}

// Função para criar os cartões dos membros e injetá-los no DOM
function displayMembers(members) {
  const container = document.getElementById('members-container');
  container.innerHTML = ''; // Limpa o conteúdo existente

  // Verifica se 'members' é um array antes de iterar
  if (!Array.isArray(members)) {
      console.error('Os dados dos membros não estão em um formato de array.');
      return;
  }

  members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');

      // Cria e adiciona a imagem do membro
      const img = document.createElement('img');
      img.src = images/${member.image}; // Certifique-se de que a pasta "images" está no mesmo nível do HTML
      img.alt = member.name || 'Imagem do membro';
      card.appendChild(img);

      // Nome do membro
      const name = document.createElement('h3');
      name.textContent = member.name || 'Nome não informado';
      card.appendChild(name);

      // Endereço
      const address = document.createElement('p');
      address.textContent = member.address || 'Endereço não informado';
      card.appendChild(address);

      // Telefone
      const phone = document.createElement('p');
      phone.textContent = member.phone || 'Telefone não informado';
      card.appendChild(phone);

      // Link do site
      const website = document.createElement('a');
      website.href = member.website || '#';
      website.textContent = 'Visitar Site';
      website.target = '_blank';
      card.appendChild(website);

      // Nível de associação
      const membership = document.createElement('p');
      let levelText = '';
      switch (member.membership) {
          case 1:
              levelText = 'Member';
              break;
          case 2:
              levelText = 'Silver';
              break;
          case 3:
              levelText = 'Gold';
              break;
          default:
              levelText = 'Member';
      }
      membership.textContent = Membership: ${``levelText`};
      card.appendChild(membership);

      container.appendChild(card);
  });
}