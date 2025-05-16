import readline from 'readline';

interface Menu {
  title: string;
  options: string[];
  previous?: Menu;
  next?: Menu;
  optionToSubmenu?: { [option: string]: Menu | ((state: State) => Promise<void>) };
  requireInput?: boolean;   
  inputPrompt?: string;     
  inputValidator?: (input: string) => boolean; 
  onInput?: (input: string, state: State) => void; 
}

interface State {
  lastInput?: string;
  currentMenu?: Menu;
  previousMenu?: Menu;
  inputMode?: boolean;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const state: State = {};

const mainMenu: Menu = {
  title: 'Menu Principal',
  options: [
    'Acheter crédit ou offre',
    'Transférer argent',
    'Mvola crédit ou épargne',
    'Retrait argent',
    'Page suivante',
  ],
  optionToSubmenu: {}
};

const pageSuivanteMenu: Menu = {
  title: 'Page suivante',
  options: [
    'Paiement Factures & Partenaires',
    'Mon compte',
    'Recevoir de l\'argent',
    'Banque et micro-finances',
    'Page précédente',
    'Menu Principal',
  ],
  optionToSubmenu: {}
};

const paiementFacturesMenu: Menu = {
  title: 'Paiement Factures & Partenaires',
  options: [
    'Accepter une demande d\'argent',
    'YAS OU MOOV',
    'Electricité et eau',
    'Assurances',
    'TV & Loisirs',
    'Transport & Voyages',
    'Impôt et cotisations sociales',
    'Page suivante',
    'Retour',
    'Menu Principal',
  ],
  optionToSubmenu: {}
};

const paiementFacturesPageSuivanteMenu: Menu = {
  title: 'Paiement Factures & Partenaires - Suite',
  options: [
    'École et universités',
    'Autres fournisseurs',
    'Page précédente',
    'Menu Principal',
  ],
};

const monCompteMenu: Menu = {
  title: 'Mon compte',
  options: [
    'Consultation des soldes',
    'Consulter mes 3 dernières transactions',
    'Reçu par email',
    'Mon répertoire Mvola',
    'Page suivante',
    'Retour',
    'Menu Principal',
  ],
  optionToSubmenu: {}
};

const monComptePageSuivanteMenu: Menu = {
  title: 'Mon compte - Suite',
  options: [
    'Mon numéro d\'identification',
    'Mon code secret',
    'Carte VISA Mvola',
    'Renvoi numéro coupon',
    'Page précédente',
    'Menu Principal',
  ],
};

const acheterMenu: Menu = {
  title: 'Acheter crédit ou offre',
  options: [
    '1. Crédit pour mon numéro',
    '2. Crédit pour autre numéro',
    '3. Offre pour mon numéro',
    '4. Offre pour autre numéro',
    'Retour',
    'Menu Principal',
  ],
  optionToSubmenu: {}
};

const creditMonNumeroMenu: Menu = {
  title: 'Crédit pour mon numéro',
  options: [
    '1. Recharger directement (montant)',
    '2. Code de recharge (montant)',
    'Retour',
    'Menu Principal',
  ],
};

const creditAutreNumeroMenu: Menu = {
  title: 'Crédit pour autre numéro',
  options: [],
  requireInput: true,
  inputPrompt: 'Veuillez entrer le numéro à recharger (10 chiffres) :',
  inputValidator: (input) => /^\d{10}$/.test(input),
  onInput: (input) => {
    console.log(`Numéro ${input} enregistré.`);
    displayMenu(creditAutreNumeroOptionsMenu);
  }
};

const creditAutreNumeroOptionsMenu: Menu = {
  title: 'Options Crédit pour autre numéro',
  options: [
    '1. Recharger directement (montant)',
    '2. Code de recharge (montant)',
    'Retour',
    'Menu Principal',
  ],
};

const offreMonNumeroMenu: Menu = {
  title: 'Offre pour mon numéro',
  options: [
    'Mora',
    'First',
    'Yelow',
    'Yas net',
    'Retour',
    'Menu Principal',
  ],
  optionToSubmenu: {}
};

const moraMenu: Menu = {
  title: 'Mora',
  options: [
    'mora 500',
    'Mora one',
    'mora+2000',
    'mora+5000',
    'Mora international',
    'Retour',
    'Menu Principal',
  ],
};

const offreAutreNumeroMenu: Menu = {
  title: 'Offre pour autre numéro',
  options: [],
  requireInput: true,
  inputPrompt: 'Veuillez entrer le numéro pour l\'offre (10 chiffres) :',
  inputValidator: (input) => /^\d{10}$/.test(input),
  onInput: (input) => {
    console.log(`Numéro ${input} enregistré.`);
    displayMenu(offreAutreNumeroOptionsMenu);
  },
};

const offreAutreNumeroOptionsMenu: Menu = {
  title: 'Offres pour autre numéro',
  options: [
    'Mora',
    'First',
    'Yelow',
    'Yas net',
    'Retour',
    'Menu Principal',
  ],
  optionToSubmenu: {}
};

const firstMenu: Menu = {
  title: 'First',
  options: [
    'FIRST PREMINIUM',
    'FIRST PREMINIUM+',
    'FIRST PRESTIGE',
    'FIRST ROYAL',
    'Retour',
    'Menu Principal'
  ],
};

const yelowMenuPage1: Menu = {
  title: 'Yelow - Page 1',
  options: [
    'YELOW100',
    'YELOW SMS',
    'YELOW500',
    'YELOW1000',
    'YELOW ONE',
    'YELOW200',
    '# Page suivante',
    'Retour',
    'Menu Principal'
  ],
};

const yelowMenuPage2: Menu = {
  title: 'Yelow - Page 2',
  options: [
    'YELOW2000',
    '## Page précédente',
    'Menu Principal'
  ],
};

const yasNetMenu: Menu = {
  title: 'Yas Net',
  options: [
    'NET HEBDOMADAIRE',
    'NET MENSUEL',
    'YELOW',
    'YAS Net',
    'ROAMING',
    'Retour',
    'Menu Principal'
  ],
};

yelowMenuPage1.next = yelowMenuPage2;
yelowMenuPage2.previous = yelowMenuPage1;

const transfererArgentMenu: Menu = {
  title: 'Transférer argent',
  options: [],
  requireInput: true,
  inputPrompt: 'Entrez le numéro destinataire (14 chiffres) :',
  inputValidator: (input) => /^\d{14}$/.test(input),
  onInput: (input, state) => {
    state.lastInput = input;
    displayMenu(transfererArgentMontantMenu);
  }
};

const transfererArgentMontantMenu: Menu = {
  title: 'Montant et frais',
  options: [
    'Entrez le montant à transférer',
  ],
  requireInput: true,
  inputPrompt: 'Montant :',
  inputValidator: (input) => /^\d+$/.test(input),
  onInput: (input) => {
    console.log(`Montant ${input} enregistré.`);
    displayMenu(priseEnChargeFraisMenu);
  }
};

const priseEnChargeFraisMenu: Menu = {
  title: 'Prise en charge des frais ?',
  options: [
    'Oui',
    'Non',
    'Retour',
    'Menu Principal',
  ],
};

const mvolaMenu: Menu = {
  title: 'Credit et Epargne',
  options: [
    'Mvola credit',
    'Mvola epargne'
  ],
};

const mvolaEpargneMenu: Menu = {
  title: 'Mvola Epargne',
  options: [
    'Transfert vers Mvola Epargne',
	  'Transferer vers compte Mvola',
	  'Consultation du solde',
	  'Simulateur Epargne',
	  'Consultation de mes 3 dernières transactions',
    'Retour',
    'Menu Principal'
  ],
};

const mvolaCreditMenu: Menu = {
  title: 'Credit et Epargne',
  options: [
    'Mvola avance',
    'FAMENO',
    'AVANCE MIKASA',
    'Retour',
    'Menu Principal'
  ],
};

mainMenu.optionToSubmenu = {
  'Acheter crédit ou offre': acheterMenu,
  'Transférer argent': transfererArgentMenu,
  'Mvola crédit ou épargne': mvolaMenu, 
  'Retrait argent': { title: 'Retrait argent', options: ['...'], previous: mainMenu },          
  'Page suivante': { title: 'Page suivante', options: ['...'], previous: mainMenu },           
};

mvolaMenu.optionToSubmenu =  {
  'Mvola epargne': mvolaEpargneMenu,
  'Mvola credit': mvolaCreditMenu,
};

pageSuivanteMenu.optionToSubmenu = {
  'Paiement Factures & Partenaires': paiementFacturesMenu,
  'Mon compte': monCompteMenu,
  'Recevoir de l\'argent': { title: 'Recevoir de l\'argent', options: ['Retour', 'Menu Principal'] },
  'Banque et micro-finances': { title: 'Banque et micro-finances', options: ['Retour', 'Menu Principal'] },
};

paiementFacturesMenu.optionToSubmenu = {
  'Page suivante': paiementFacturesPageSuivanteMenu,
  'Retour': pageSuivanteMenu,
  'Menu Principal': mainMenu,
};

paiementFacturesPageSuivanteMenu.optionToSubmenu = {
  'Page précédente': paiementFacturesMenu,
  'Menu Principal': mainMenu,
};

monCompteMenu.optionToSubmenu = {
  'Page suivante': monComptePageSuivanteMenu,
  'Retour': pageSuivanteMenu,
  'Menu Principal': mainMenu,
};

monComptePageSuivanteMenu.optionToSubmenu = {
  'Page précédente': monCompteMenu,
  'Menu Principal': mainMenu,
};

mainMenu.optionToSubmenu!['# Page suivante'] = pageSuivanteMenu;
acheterMenu.optionToSubmenu = {
  'Crédit pour mon numéro': creditMonNumeroMenu,
  'Crédit pour autre numéro': creditAutreNumeroMenu,
  'Offre pour mon numéro': offreMonNumeroMenu,
  'Offre pour autre numéro': offreAutreNumeroMenu,
};

offreMonNumeroMenu.optionToSubmenu = {
  'Mora': moraMenu,
  'First': firstMenu,
  'Yelow': yelowMenuPage1,
  'Yas net': yasNetMenu
};

offreAutreNumeroOptionsMenu.optionToSubmenu = {
  'Mora': moraMenu,
  'First': firstMenu,
  'Yelow': yelowMenuPage1,
  'Yas net': yasNetMenu
};

function displayMenu(menu: Menu) {
  state.currentMenu = menu;
  if (menu.requireInput) {
    rl.question(menu.inputPrompt + ' ', (answer) => {
      if (!menu.inputValidator || menu.inputValidator(answer)) {
        if (menu.onInput) {
          menu.onInput(answer, state);
        }
      } else {
        console.log('Entrée invalide, veuillez réessayer.');
        displayMenu(menu);
      }
    });
  } else {
    console.clear();
    console.log(menu.title);
    menu.options.forEach((opt, idx) => {
      console.log(`${idx + 1}. ${opt}`);
    });
    rl.question('Choisissez une option: ', (choice) => handleChoice(choice, menu));
  }
}

function handleChoice(choice: string, menu: Menu) {
  const idx = parseInt(choice) - 1;
  if (isNaN(idx) || idx < 0 || idx >= menu.options.length) {
    console.log('Choix invalide.');
    return displayMenu(menu);
  }
  const selectedOption = menu.options[idx];

  if (selectedOption === 'Retour') {
    if (menu.previous) {displayMenu(menu.previous);}
    else {displayMenu(mainMenu);}
  } else if (selectedOption === 'Menu Principal') {
    displayMenu(mainMenu);
  } else if (menu.optionToSubmenu && menu.optionToSubmenu[selectedOption]) {
    const nextMenu = menu.optionToSubmenu[selectedOption];
    if (typeof nextMenu === 'function') {
      nextMenu(state);
    } else {
      nextMenu.previous = menu;
      displayMenu(nextMenu);
    }
  } else {
    console.log(`Option sélectionnée : ${selectedOption}`);
    rl.question('Appuyez sur Entrée pour continuer...', () => displayMenu(menu));
  }
}

displayMenu(mainMenu);
