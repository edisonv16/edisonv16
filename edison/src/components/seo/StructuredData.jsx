const StructuredData = ({ schema }) => {
  const jsonLd = JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  )
}

export default StructuredData
