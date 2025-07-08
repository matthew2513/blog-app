async function deleteArticle(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this article?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/posts/${id}/delete`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.href = "/posts/blog";
    } else {
      const errorText = await response.text();
      alert(`Failed to delete article: ${errorText}`);
    }
  } catch (error) {
    console.error(`Error deleting article: ${error}`);
    alert("An error occurred while deleting the article.");
  }
}
