
export class StorageClient {
  static async upload(
    file: File,
    type: 'user'|'equipo'
  ): Promise<string> {
    const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      
      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        throw new Error("StorageClient: Error al subir imagen");
      }
  
      const {path} = await response.json();
      return path
  }

  static async delete(path: string): Promise<string> {

    const response = await fetch("/api/storage/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path })
    });

    console.log(response)

    if (!response.ok) {
      throw new Error("StorageClient: Error al eliminar imagen");
    }

    const data = await response.json();
    return data.path;
  }
}
