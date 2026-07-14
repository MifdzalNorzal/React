export const layout = {
  // Card dimensions — change these to resize both panels together
  cardHeight: 637,          // px — explicit height enforced on both cards

  // Two-column content area
  contentMaxWidth: 1500,     // px — max width of the two-column layout
  carouselColumn: '1fr',    // CSS grid width for left (carousel) column
  formColumn: '1fr',        // CSS grid width for right (form) column
  columnGap: 17,             // MUI spacing units (= 24px)

  // Page padding around the content area
  contentPaddingX: { xs: 2, sm: 4, md: 8 },
  contentPaddingY: { xs: 3, md: 5 },
}
