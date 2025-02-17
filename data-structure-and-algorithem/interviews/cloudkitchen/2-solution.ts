type MenuItemType = "CATEGORY" | "DISH" | "OPTION";

interface MenuItem {
  id: number;
  type: MenuItemType;
  name: string;
  price?: number;
  linkedItems: number[];
}

class Category implements MenuItem {
  id: number;
  type: "CATEGORY";
  name: string;
  linkedItems: number[];

  constructor(id: number, name: string, linkedItems: number[]) {
    this.id = id;
    this.type = "CATEGORY";
    this.name = name;
    this.linkedItems = linkedItems;
  }
}

class Dish implements MenuItem {
  id: number;
  type: "DISH";
  name: string;
  price: number;
  linkedItems: number[];

  constructor(id: number, name: string, price: number, linkedItems: number[]) {
    this.id = id;
    this.type = "DISH";
    this.name = name;
    this.price = price;
    this.linkedItems = linkedItems;
  }
}

class OptionItem implements MenuItem {
  id: number;
  type: "OPTION";
  name: string;
  price: number;
  linkedItems: number[];

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.type = "OPTION";
    this.name = name;
    this.price = price;
    this.linkedItems = [];
  }
}

class Menu {
  items: MenuItem[];

  constructor() {
    this.items = [];
  }

  // Method to add a menu item
  addItem(item: MenuItem) {
    this.items.push(item);
  }

  // Method to reconstruct the menu stream from the object
  reconstructMenuStream(): string {
    return this.items
      .map((item) => {
        let base = `${item.id}\n${item.type}\n${item.name}`;
        if (item.type === "DISH" || item.type === "OPTION") {
          base += `\n${item.price?.toFixed(2)}`;
        }
        if (item.linkedItems.length > 0) {
          base += `\n${item.linkedItems.join("\n")}`;
        }
        return base;
      })
      .join("\n\n");
  }
}

function parseMenuStream(menuStream: string): Menu {
  const lines = menuStream.split("\n");
  const menu = new Menu();
  let i = 0;

  while (i < lines.length) {
    const id = parseInt(lines[i]);
    const type = lines[i + 1] as MenuItemType;
    const name = lines[i + 2];
    const linkedItems: number[] = [];
    let price: number | undefined;

    if (type === "DISH" || type === "OPTION") {
      price = parseFloat(lines[i + 3]);
      i += 4;
    } else {
      i += 3;
    }

    // Collect linked items
    while (i < lines.length && lines[i].trim() !== "") {
      linkedItems.push(parseInt(lines[i]));
      i++;
    }

    let menuItem: MenuItem;
    if (type === "CATEGORY") {
      menuItem = new Category(id, name, linkedItems);
    } else if (type === "DISH") {
      menuItem = new Dish(id, name, price!, linkedItems);
    } else {
      menuItem = new OptionItem(id, name, price!);
    }

    menu.addItem(menuItem);

    // Skip over the blank line between items
    i++;
  }

  return menu;
}

// Example usage:

const menuStream = `
4
DISH
Spaghetti
10.95
2
3

1
CATEGORY
Pasta
4
5

2
OPTION
Meatballs
1.00

3
OPTION
Chicken
2.00

5
DISH
Lasagna
12.00

6
DISH
Caesar Salad
9.75
3
`;

const myMenu = parseMenuStream(menuStream.trim());
console.log(myMenu.items);
console.log(myMenu.reconstructMenuStream());
