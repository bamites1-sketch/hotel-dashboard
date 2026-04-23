export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  description: string;
  shortDescription: string;
  images: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  category: 'luxury' | 'boutique' | 'resort' | 'business' | 'budget';
  amenities: string[];
  rooms: Room[];
  coordinates: { lat: number; lng: number };
  featured: boolean;
  tags: string[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: number; // sqm
  bedType: string;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelLocation: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
  confirmationCode: string;
}

export interface Review {
  id: string;
  hotelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  categories: {
    cleanliness: number;
    service: number;
    location: number;
    value: number;
  };
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  rating: number;
  amenities: string[];
  category: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'popular';
}
