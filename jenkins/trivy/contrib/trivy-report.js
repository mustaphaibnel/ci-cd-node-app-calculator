window.onload = function() {
    document.querySelectorAll('td.links').forEach(function(linkCell) {
      var links = [].concat.apply([], linkCell.querySelectorAll('a'));
      links.sort(function(a, b) {
        return a.href.localeCompare(b.href);
      });
      links.forEach(function(link, idx) {
        if (links.length > 4 && idx === 3) {
          var toggleLink = document.createElement('a');
          toggleLink.innerText = "Toggle more links";
          toggleLink.href = "#";
          toggleLink.className = "toggle-more-links";
          toggleLink.addEventListener("click", function(event) {
            event.preventDefault();
            var expanded = linkCell.getAttribute("data-more-links");
            linkCell.setAttribute("data-more-links", expanded === "on" ? "off" : "on");
          });
          linkCell.appendChild(toggleLink);
        }
        linkCell.appendChild(link);
      });
    });
  };
  