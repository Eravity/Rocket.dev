import { StructureBuilder } from "sanity/desk";

// Define a function that returns the entire structure definition
const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Regular document types
      S.documentTypeListItem("post").title("All Posts"),

      // Create a "folder" for blog content
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog Content")
            .items([
              S.documentTypeListItem("post").title("Blog Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),

      // Course folders using proper filtering method
      S.listItem()
        .title("Courses")
        .child(
          S.list()
            .title("Courses Content")
            .items([
              S.listItem()
                .title("Introduction")
                .child(
                  S.documentList()
                    .title("Course 1 Posts")
                    .filter(
                      '_type == "post" && references(*[_type == "category" && title == "Introduction"]._id)'
                    )
                ),
            ])
        ),
    ]);

// Export the structure as default
export default structure;
