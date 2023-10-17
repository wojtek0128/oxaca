/**
 * Interface for allergens.
 */
export interface allergen {
    readonly value: number;
    readonly label: string;
}

/**
 * All options for allergens.
 */
export const allergenOptions: readonly allergen[] = [
    { value: 1, label: "Molluscs"},
    { value: 2, label: "Eggs"},
    { value: 3, label: "Fish"},
    { value: 4, label: "Lupin"},
    { value: 5, label: "Soya"},
    { value: 6, label: "Milk"},
    { value: 7, label: "Peanuts"},
    { value: 8, label: "Glutens"},
    { value: 9, label: "Crustaceans"},
    { value: 10, label: "Mustard"},
    { value: 11, label: "Nuts"},
    { value: 12, label: "Sesame"},
    { value: 13, label: "Celery"},
    { value: 14, label: "Sulphates"},
];