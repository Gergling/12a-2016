<!DOCTYPE html>
<html lang="en" xml:lang="en">
    <head>
        <meta charset="utf-8">
        <title>12a Configuration Report</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" type="text/css" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
    </head>

    <body>
        Total Scale/Map configurations.
        <table class='table table-bordered'>
            <tr>
                <th>Scale/Map</th>
                <th>Quests</th>
                <th>Sprites</th>
                <th>Abilities</th>
                <th>Terrain</th>
            </tr>

            <% Object.keys(report).forEach(function (scale) {
                Object.keys(report[scale]).forEach(function (map) { %>

                    <tr>
                        <td><%- scale %>/<%- map %></td>
                        <td><%- report[scale][map].quests.length %></td>
                        <td><%- report[scale][map].sprite.length %></td>
                        <td><%- report[scale][map].ability.length %></td>
                        <td><%- report[scale][map].terrain.length %></td>
                    </tr>

                <% });
            }); %>
        </table>

        Sprite Abilities (on a per-sprite basis, display abilities assigned to them).
        <table class='table table-bordered'>
            <tr>
                <th>Scale/Map</th>
                <th>Sprites</th>
                <th>Abilities</th>
            </tr>

            <% Object.keys(report).forEach(function (scale) {
                Object.keys(report[scale]).forEach(function (map) { %>

                    <tr>
                        <td><%- scale %>/<%- map %></td>
                        <td><%- report[scale][map].sprite.length %></td>
                        <td><%- report[scale][map].ability.length %></td>
                    </tr>

                <% });
            }); %>
        </table>
    </body>
</html>
