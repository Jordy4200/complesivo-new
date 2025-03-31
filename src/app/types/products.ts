
type Rating = {
    rate: number;
    count: number;
}

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;      // Portada del juego
    rating: Rating;
    platform: string;   // Ej: "PS5", "Xbox", "PC", "Nintendo Switch"
    releaseYear: number; // Año de lanzamiento
}