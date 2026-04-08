# frozen_string_literal: true

require "tmpdir"
require_relative "../scripts/generate_unitsml_opal_payload"

RSpec.describe PlurimathJs::UnitsmlOpalPayloadGenerator do
  let(:database_hash) do
    {
      "schema_version" => "2.0.0",
      "units" => [],
      "prefixes" => [],
      "quantities" => [],
      "dimensions" => [],
      "unit_systems" => [],
    }
  end

  describe ".to_ruby_source" do
    it "renders a Ruby payload file that loads the Opal database payload" do
      source = described_class.to_ruby_source(database_hash)

      expect(source).to include('require "unitsml"')
      expect(source).to include("Unitsml::Unitsdb::Database.load_opal_payload(")
      expect(source).not_to include("class OpalDatabase")
      expect(source).not_to include("def self.from_db")
      expect(source).to match(/"schema_version"\s*=>\s*"2\.0\.0"/)
      expect(source).to include(".freeze")
    end

    it "preserves UTF-8 unit symbols in the generated Ruby literal" do
      source = described_class.to_ruby_source(
        database_hash.merge(
          "units" => [
            {
              "id" => "ohm",
              "symbols" => ["Ω", "µΩ"],
            },
          ],
        ),
      )

      expect(source.encoding).to eq(Encoding::UTF_8)
      expect(source).to include('"Ω"')
      expect(source).to include('"µΩ"')
    end
  end

  describe ".write_to" do
    it "writes the generated payload file to the requested path" do
      file_path = nil

      Dir.mktmpdir do |dir|
        file_path = described_class.write_to(
          File.join(dir, "unitsml_opal_payload.rb"),
          database_hash: database_hash,
        )

        generated_source = File.read(file_path)
        expect(generated_source).to eq(described_class.to_ruby_source(database_hash))
      end

      expect(file_path).to end_with("unitsml_opal_payload.rb")
    end
  end
end
