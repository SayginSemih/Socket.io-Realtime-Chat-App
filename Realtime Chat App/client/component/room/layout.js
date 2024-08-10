export const metadata = {
    title: 'Oda',
    description: 'Room',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  