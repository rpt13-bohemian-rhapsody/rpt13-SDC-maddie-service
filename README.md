# Item Name, Description, and Options with Price

### Installing Dependencies

From within the root directory: `npm install`

### Starting service

From the root of the service folder, run `npm start`.

### CASSANDRA DATABASE

-- Developed at Facebook for "Inbox search"
-- Handle tremendous writes, geo replication - to reduce search latencies
-- Founded on Google Big Table (data model), Amazon Dynamo (distributed nature)
-- used by Apple also
-- Has nodes, cluster, masterless peer-to-peer system
-- Each node - running instance of Cassandra - all functionality exists

-- Data has token values
-- Virtual Nodes
-- Snitches

#### Install Cassandra

**Install JDK**
https://www.oracle.com/technetwork/java/javase/downloads/index.html

**Cassandra directory**
`mkdir -p ~/opt/packages/cassandra/`

**Download Cassandra**
http://cassandra.apache.org/download/

**Path**
Add Cassandra to your path in .bash_profile or .zshrc

**verify**
`cassandra -v`

