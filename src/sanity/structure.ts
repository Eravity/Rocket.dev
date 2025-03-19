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
        .title("Course 1")
        .child(
          S.list()
            .title("Course 1 Content")
            .items([
              S.listItem()
                .title("Course 1 Materials")
                .child(
                  S.documentList()
                    .title("Course 1 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 1"]._id)')
                )
            ])
        ),
      
      // Course 2
      S.listItem()
        .title("Course 2")
        .child(
          S.list()
            .title("Course 2 Content")
            .items([
              S.listItem()
                .title("Course 2 Materials")
                .child(
                  S.documentList()
                    .title("Course 2 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 2"]._id)')
                )
            ])
        ),
      
      // Course 3-9 (following the same pattern)
      // Course 3
      S.listItem()
        .title("Course 3")
        .child(
          S.list()
            .title("Course 3 Content")
            .items([
              S.listItem()
                .title("Course 3 Materials")
                .child(
                  S.documentList()
                    .title("Course 3 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 3"]._id)')
                )
            ])
        ),
      
      // Course 4
      S.listItem()
        .title("Course 4")
        .child(
          S.list()
            .title("Course 4 Content")
            .items([
              S.listItem()
                .title("Course 4 Materials")
                .child(
                  S.documentList()
                    .title("Course 4 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 4"]._id)')
                )
            ])
        ),
      
      // Course 5
      S.listItem()
        .title("Course 5")
        .child(
          S.list()
            .title("Course 5 Content")
            .items([
              S.listItem()
                .title("Course 5 Materials")
                .child(
                  S.documentList()
                    .title("Course 5 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 5"]._id)')
                )
            ])
        ),
      
      // Course 6
      S.listItem()
        .title("Course 6")
        .child(
          S.list()
            .title("Course 6 Content")
            .items([
              S.listItem()
                .title("Course 6 Materials")
                .child(
                  S.documentList()
                    .title("Course 6 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 6"]._id)')
                )
            ])
        ),
      
      // Course 7
      S.listItem()
        .title("Course 7")
        .child(
          S.list()
            .title("Course 7 Content")
            .items([
              S.listItem()
                .title("Course 7 Materials")
                .child(
                  S.documentList()
                    .title("Course 7 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 7"]._id)')
                )
            ])
        ),
      
      // Course 8
      S.listItem()
        .title("Course 8")
        .child(
          S.list()
            .title("Course 8 Content")
            .items([
              S.listItem()
                .title("Course 8 Materials")
                .child(
                  S.documentList()
                    .title("Course 8 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 8"]._id)')
                )
            ])
        ),
      
      // Course 9
      S.listItem()
        .title("Course 9")
        .child(
          S.list()
            .title("Course 9 Content")
            .items([
              S.listItem()
                .title("Course 9 Materials")
                .child(
                  S.documentList()
                    .title("Course 9 Posts")
                    .filter('_type == "post" && references(*[_type == "category" && title == "Course 9"]._id)')
                )
            ])
        ),
    ]);

// Export the structure as default
export default structure;
